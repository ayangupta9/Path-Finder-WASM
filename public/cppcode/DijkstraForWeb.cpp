#include <iostream>
#include <vector>
#include <list>
#include <math.h>
#include <algorithm>
#include <emscripten.h>
#include <emscripten/bind.h>

using namespace std;
// using namespace emscripten;

#define Infinity 9999999

struct Node
{
    int row;
    int col;
    Node *parentNode;
    float distance;
    bool isVisited;
    bool isWall;
    vector<Node *> vecNeighbors;
};

extern "C"
{
    vector<int> returnVector()
    {
        vector<int> vec;
        return vec;
    }

    vector<int> solveDijkstra(vector<int> walls, int startRow, int startCol, int endRow, int endCol, int gridWidth, int gridHeight)
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
                nodes[j * gridWidth + i].isVisited = false;
                nodes[j * gridWidth + i].parentNode = nullptr;
                nodes[j * gridWidth + i].distance = Infinity;
                nodes[j * gridWidth + i].isWall = false;
                if (i > 0)
                    nodes[j * gridWidth + i].vecNeighbors.emplace_back(&nodes[(j)*gridWidth + (i - 1)]);
                if (i < gridWidth - 1)
                    nodes[j * gridWidth + i].vecNeighbors.emplace_back(&nodes[(j)*gridWidth + (i + 1)]);
                if (j > 0)
                    nodes[j * gridWidth + i].vecNeighbors.emplace_back(&nodes[(j - 1) * gridWidth + (i)]);
                if (j < gridHeight - 1)
                    nodes[j * gridWidth + i].vecNeighbors.emplace_back(&nodes[(j + 1) * gridWidth + (i)]);
            }
        }

        for (int i = 0; i < walls.size() - 1; i += 2)
            nodes[walls[i] * gridWidth + walls[i + 1]].isWall = true;

        Node *startNode = &nodes[startCol * gridWidth + startRow];
        Node *endNode = &nodes[endCol * gridWidth + endRow];

        Node *currentNode = startNode;
        startNode->distance = 0.0f;

        list<Node *> unvisitedNodes;
        unvisitedNodes.push_back(startNode);

        while (!unvisitedNodes.empty() && currentNode != endNode)
        {
            while (!unvisitedNodes.empty() && unvisitedNodes.front()->isVisited)
                unvisitedNodes.pop_front();

            if (unvisitedNodes.empty())
                break;

            unvisitedNodes.sort([](const Node *lhs, const Node *rhs)
                                { return lhs->distance < rhs->distance; });

            currentNode = unvisitedNodes.front();
            currentNode->isVisited = true;

            for (auto neighbor : currentNode->vecNeighbors)
            {
                if (!neighbor->isVisited && !neighbor->isWall)
                    unvisitedNodes.push_back(neighbor);

                if (currentNode->distance + 1 < neighbor->distance)
                {
                    neighbor->distance = currentNode->distance + 1;
                    neighbor->parentNode = currentNode;
                }
            }
        }

        if (endNode != nullptr)
        {
            Node *p = endNode->parentNode;
            while (p->parentNode != nullptr)
            {
                optimumPath.emplace_back(p);
                p = p->parentNode;
            }
        }

        for (int i = 0; i < gridWidth; i++)
        {
            for (int j = 0; j < gridHeight; j++)
            {
                if (nodes[j * gridWidth + i].isVisited)
                    visitedNodesPath.emplace_back(&nodes[j * gridWidth + i]);
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

EMSCRIPTEN_BINDINGS(dijkstraHelper)
{
    // emscripten::function<vector<int>>("returnData", &returnData);
    emscripten::function<vector<int>>("solveDijkstra", &solveDijkstra, emscripten::allow_raw_pointers());
    emscripten::function<vector<int>>("returnVector", &returnVector);
    emscripten::register_vector<int>("vector<int>");
}

    // vector<int> returnData()
    // {
    //     vector<int> vec;
    //     for (int i = 1; i <= 5; i++)
    //     {
    //         vec.emplace_back(i);
    //     }
    //     return vec;
    // }

    // vector<int> solveDijkstra(int *walls, int wallsLength, int startRow, int startCol, int endRow, int endCol, int gridWidth, int gridHeight)
    // {
    //     Node *nodes = new Node[gridWidth * gridHeight];
    //     vector<Node *> optimumPath;
    //     vector<Node *> visitedNodesPath;
    //     for (int i = 0; i < gridWidth; i++)
    //     {
    //         for (int j = 0; j < gridHeight; j++)
    //         {
    //             nodes[j * gridWidth + i].row = i;
    //             nodes[j * gridWidth + i].col = j;
    //             nodes[j * gridWidth + i].isVisited = false;
    //             nodes[j * gridWidth + i].parentNode = nullptr;
    //             nodes[j * gridWidth + i].distance = Infinity;
    //             nodes[j * gridWidth + i].isWall = false;
    //             if (i > 0)
    //                 nodes[j * gridWidth + i].vecNeighbors.emplace_back(&nodes[(j)*gridWidth + (i - 1)]);
    //             if (i < gridWidth - 1)
    //                 nodes[j * gridWidth + i].vecNeighbors.emplace_back(&nodes[(j)*gridWidth + (i + 1)]);
    //             if (j > 0)
    //                 nodes[j * gridWidth + i].vecNeighbors.emplace_back(&nodes[(j - 1) * gridWidth + (i)]);
    //             if (j < gridHeight - 1)
    //                 nodes[j * gridWidth + i].vecNeighbors.emplace_back(&nodes[(j + 1) * gridWidth + (i)]);
    //         }
    //     }

    //     for (int i = 0; i < wallsLength - 1; i += 2)
    //         nodes[walls[i] * gridWidth + walls[i + 1]].isWall = true;

    //     Node *startNode = &nodes[startCol * gridWidth + startRow];
    //     Node *endNode = &nodes[endCol * gridWidth + endRow];

    //     Node *currentNode = startNode;
    //     startNode->distance = 0.0f;

    //     list<Node *> unvisitedNodes;
    //     unvisitedNodes.push_back(startNode);

    //     while (!unvisitedNodes.empty() && currentNode != endNode)
    //     {
    //         while (!unvisitedNodes.empty() && unvisitedNodes.front()->isVisited)
    //             unvisitedNodes.pop_front();

    //         if (unvisitedNodes.empty())
    //             break;

    //         unvisitedNodes.sort([](const Node *lhs, const Node *rhs)
    //                             { return lhs->distance < rhs->distance; });

    //         currentNode = unvisitedNodes.front();
    //         currentNode->isVisited = true;

    //         for (auto neighbor : currentNode->vecNeighbors)
    //         {
    //             if (!neighbor->isVisited && !neighbor->isWall)
    //                 unvisitedNodes.push_back(neighbor);

    //             if (currentNode->distance + 1 < neighbor->distance)
    //             {
    //                 neighbor->distance = currentNode->distance + 1;
    //                 neighbor->parentNode = currentNode;
    //             }
    //         }
    //     }

    //     if (endNode != nullptr)
    //     {
    //         Node *p = endNode->parentNode;
    //         while (p->parentNode != nullptr)
    //         {
    //             optimumPath.emplace_back(p);
    //             p = p->parentNode;
    //         }
    //     }

    //     for (int i = 0; i < gridWidth; i++)
    //     {
    //         for (int j = 0; j < gridHeight; j++)
    //         {
    //             if (nodes[j * gridWidth + i].isVisited)
    //                 visitedNodesPath.emplace_back(&nodes[j * gridWidth + i]);
    //         }
    //     }

    //     vector<int> result;
    //     int optimumPathSize = 2 * optimumPath.size();
    //     int visitedNodesSize = 2 * visitedNodesPath.size();

    //     result.push_back(optimumPathSize);

    //     for (auto i : optimumPath)
    //     {
    //         result.push_back(i->col);
    //         result.push_back(i->row);
    //     }

    //     result.push_back(-1);
    //     result.push_back(visitedNodesSize);

    //     for (auto i : visitedNodesPath)
    //     {
    //         result.push_back(i->col);
    //         result.push_back(i->row);
    //     }

    //     result.push_back(-2);

    //     // vector<vector<string>> grid(gridWidth, vector<string>(gridHeight));
    //     // for (int i = 0; i < gridWidth; i++)
    //     // {
    //     //     for (int j = 0; j < gridHeight; j++)
    //     //     {
    //     //         if (startRow == i && startCol == j)
    //     //         {
    //     //             grid[i][j] = "S";
    //     //         }
    //     //         else if (endRow == i && endCol == j)
    //     //         {
    //     //             grid[i][j] = "E";
    //     //         }
    //     //         else
    //     //         {
    //     //             grid[i][j] = "-";
    //     //         }
    //     //     }
    //     // }
    //     // for (int i = 0; i < wallsLength - 1; i += 2)
    //     //     grid[walls[i]][walls[i + 1]] = "W";
    //     // for (auto i : visitedNodesPath)
    //     //     grid[i.first][i.second] = "+";
    //     // for (auto i : optimumPath)
    //     //     grid[i->row][i->col] = "P";
    //     // for (auto i : grid)
    //     // {
    //     //     for (auto j : i)
    //     //         cout << j << " ";
    //     //     cout << endl;
    //     // }
    //     // result[550] = resultSize;
    //     // int j = 551;
    //     // result[resultSize + 1] = -1;
    //     // j = 1000;
    //     // result[j++] = -2;
    //     // result[j++] = visitedNodesSize;
    //     // result[j] = -2;
    //     // j = resultSize + 1;
    //     // result[++j] = -2;
    //     // result[++j] = visitedNodesSize;
    //     // ++j;
    //     // for (auto i : visitedNodesPath)
    //     // {
    //     //     result[j] = i->col;
    //     //     ++j;
    //     //     result[j] = i->row;
    //     //     ++j;
    //     // }
    //     // result[j] = -2;

    //     delete[] nodes;
    //     return result;
    // }