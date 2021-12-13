#include <iostream>
#include <vector>
#include <list>
#include <math.h>
#include <algorithm>
#include <emscripten.h>
#include <emscripten/bind.h>

using namespace std;

#define Infinity 9999999

struct Node
{
    int row;
    int col;
    vector<Node *> vecNeighbors;
    Node *parentNode;
    float globalGoal;
    float localGoal;
    bool isVisited = false;
    bool isWall = false;
};

extern "C"
{
    vector<int> returnVector()
    {
        vector<int> vec;
        return vec;
    }

    vector<int> solveastar(vector<int> walls, int startRow, int startCol, int endRow, int endCol, int gridWidth, int gridHeight)
    {
        Node *nodes = new Node[gridWidth * gridHeight];
        vector<Node *> optimumPath;
        vector<Node *> visitedNodesPath;

        for (int i = 0; i < gridWidth; i++)
        {
            for (int j = 0; j < gridHeight; j++)
            {
                nodes[j * gridWidth + i].row = i;
                nodes[j * gridWidth + i].col = j;
                nodes[j * gridWidth + i].parentNode = nullptr;
                nodes[j * gridWidth + i].isVisited = false;
                nodes[j * gridWidth + i].isWall = false;
                nodes[j * gridWidth + i].globalGoal = Infinity;
                nodes[j * gridWidth + i].localGoal = Infinity;

                if (j > 0)
                    nodes[j * gridWidth + i].vecNeighbors.emplace_back(&nodes[(j - 1) * gridWidth + (i + 0)]);
                if (j < gridHeight - 1)
                    nodes[j * gridWidth + i].vecNeighbors.emplace_back(&nodes[(j + 1) * gridWidth + (i + 0)]);
                if (i > 0)
                    nodes[j * gridWidth + i].vecNeighbors.emplace_back(&nodes[(j + 0) * gridWidth + (i - 1)]);
                if (i < gridWidth - 1)
                    nodes[j * gridWidth + i].vecNeighbors.emplace_back(&nodes[(j + 0) * gridWidth + (i + 1)]);
            }
        }

        for (int i = 0; i < walls.size() - 1; i += 2)
            nodes[walls[i] * gridWidth + walls[i + 1]].isWall = true;

        Node *nodeStart = &nodes[startCol * gridWidth + startRow];
        Node *nodeEnd = &nodes[endCol * gridWidth + endRow];

        auto distance = [](Node *a, Node *b)
        {
            return sqrtf((a->row - b->row) * (a->row - b->row) + (a->col - b->col) * (a->col - b->col));
        };

        auto heuristic = [distance](Node *a, Node *b)
        {
            return distance(a, b);
        };

        Node *currentNode = nodeStart;
        nodeStart->localGoal = 0.0f;
        nodeStart->globalGoal = heuristic(nodeStart, nodeEnd);

        list<Node *> unvisitedNodes;
        unvisitedNodes.push_back(nodeStart);

        while (!unvisitedNodes.empty() && currentNode != nodeEnd)
        {
            unvisitedNodes.sort([](Node *lhs, Node *rhs)
                                { return lhs->globalGoal < rhs->globalGoal; });

            while (!unvisitedNodes.empty() && unvisitedNodes.front()->isVisited)
                unvisitedNodes.pop_front();

            if (unvisitedNodes.empty())
                break;

            currentNode = unvisitedNodes.front();
            currentNode->isVisited = true;
            visitedNodesPath.emplace_back(currentNode);

            for (auto nodeNeighbor : currentNode->vecNeighbors)
            {
                if (!nodeNeighbor->isVisited && !nodeNeighbor->isWall)
                    unvisitedNodes.push_back(nodeNeighbor);

                float possibleLowerGoal = currentNode->localGoal + distance(currentNode, nodeNeighbor);

                if (possibleLowerGoal < nodeNeighbor->localGoal)
                {
                    nodeNeighbor->parentNode = currentNode;
                    nodeNeighbor->localGoal = possibleLowerGoal;

                    nodeNeighbor->globalGoal = nodeNeighbor->localGoal + heuristic(nodeNeighbor, nodeEnd);
                }
            }
        }

        if (nodeEnd != nullptr)
        {
            Node *p = nodeEnd;
            while (p->parentNode != nullptr)
            {
                optimumPath.emplace_back(p);
                p = p->parentNode;
            }
        }

        vector<int> result;
        int optimumPathSize = 2 * optimumPath.size();
        int visitedNodesSize = 2 * visitedNodesPath.size();

        result.push_back(optimumPathSize);

        for (auto i : optimumPath)
        {
            result.push_back(i->col);
            result.push_back(i->row);
        }

        result.push_back(-1);
        result.push_back(visitedNodesSize);

        for (auto i : visitedNodesPath)
        {
            result.push_back(i->col);
            result.push_back(i->row);
        }

        result.push_back(-2);

        delete[] nodes;
        return result;
    }
}

EMSCRIPTEN_BINDINGS(astarHelper)
{
    emscripten::function<vector<int>>("solveastar", &solveastar, emscripten::allow_raw_pointers());
    emscripten::function<vector<int>>("returnVector", &returnVector);
    emscripten::register_vector<int>("vector<int>");
}

// int *solveastar(int *walls, int wallsLength, int startRow, int startCol, int endRow, int endCol, int gridWidth, int gridHeight)
// EMSCRIPTEN_KEEPALIVE
// int main()
// {
//     int walls[] = {9, 1, 9, 2, 9, 8, 3, 8, 4, 7, 4, 7, 7, 8, 8, 8, 9, 8, 10, 8, 11, 9, 11, 9, 12, 9, 13, 8, 14, 7, 14, 6, 14, 6, 15, 5, 15, 4, 15, 3, 15, 2};
//     int wallsLength = sizeof(walls) / sizeof(walls[0]);
//     int startRow = 3;
//     int startCol = 3;
//     int endRow = 6;
//     int endCol = 26;
//     int gridWidth = 15;
//     int gridHeight = 30;
//     int result[500] = {0};
//     // int *optimumPath = solveastar(walls, wallsLength, startRow, startCol, endRow, endCol, gridWidth, gridHeight);
//     // cout << 192 << endl;
//     // vector<Node *> optimumPath =
//     solveastar(walls, wallsLength, result, startRow, startCol, endRow, endCol, gridWidth, gridHeight);
//     vector<vector<string>> grid(gridWidth, vector<string>(gridHeight, ""));
//     for (int i = 0; i < gridWidth; i++)
//     {
//         for (int j = 0; j < gridHeight; j++)
//         {
//             if (i == startRow && j == startCol)
//                 grid[i][j] = "S";
//             else if (i == endRow && j == endCol)
//                 grid[i][j] = "E";
//             else
//                 grid[i][j] = "-";
//         }
//     }
//     for (int i = 1; i < result[0]; i += 2)
//     {
//         grid[result[i + 1]][result[i]] = "P";
//     }
//     for (int i = 0; i < wallsLength - 1; i += 2)
//         grid[walls[i + 1]][walls[i]] = "W";
//     // for (int i = 0; i < pathSize - 1; i += 2)
//     //     grid[optimumPath[i]->col][optimumPath[i + 1]->row] = "P";
//     //     grid[result[i]][result[i + 1]] = "P";
//     // for (auto i : optimumPath)
//     //     grid[i->row][i->col] = "P";
//     for (int i = 0; i < gridWidth; i++)
//     {
//         for (int j = 0; j < gridHeight; j++)
//             cout << grid[i][j] << " ";
//         cout << "\n";
//     }
// }
