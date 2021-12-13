#include <iostream>
#include <vector>
#include <math.h>
#include <algorithm>
#include <queue>
#include <list>
#include <emscripten.h>
#include <emscripten/bind.h>

#define Infinity 9999999
using namespace std;

struct Node
{
    int row;
    int col;
    float distance;
    float totaldistance;
    Node *parentNode;
    vector<Node *> neighbors;
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

    vector<int> solveBestFS(vector<int> walls, int startRow, int startCol, int endRow, int endCol, int rowCount, int colCount)
    {
        vector<Node *> optimumPath;
        vector<Node *> visitedNodesPath;
        Node *nodes = new Node[rowCount * colCount];

        for (int i = 0; i < rowCount; i++)
        {
            for (int j = 0; j < colCount; j++)
            {
                nodes[j * rowCount + i].row = i;
                nodes[j * rowCount + i].col = j;
                nodes[j * rowCount + i].parentNode = nullptr;
                nodes[j * rowCount + i].isVisited = false;
                nodes[j * rowCount + i].distance = Infinity;
                nodes[j * rowCount + i].totaldistance = Infinity;
                nodes[j * rowCount + i].isWall = false;

                if (i > 0)
                    nodes[j * rowCount + i].neighbors.emplace_back(&nodes[(j)*rowCount + (i - 1)]);
                if (i < rowCount - 1)
                    nodes[j * rowCount + i]
                        .neighbors.emplace_back(&nodes[(j)*rowCount + (i + 1)]);
                if (j > 0)
                    nodes[j * rowCount + i].neighbors.emplace_back(&nodes[(j - 1) * rowCount + i]);
                if (j < colCount - 1)
                    nodes[j * rowCount + i].neighbors.emplace_back(&nodes[(j + 1) * rowCount + i]);
            }
        }

        for (int i = 0; i < walls.size() - 1; i += 2)
            nodes[walls[i] * rowCount + walls[i + 1]].isWall = true;

        Node *nodeStart = &nodes[startCol * rowCount + startRow];
        Node *nodeEnd = &nodes[endCol * rowCount + endRow];

        auto distance = [](Node *a, Node *b)
        {
            return sqrtf((a->row - b->row) * (a->row - b->row) + (a->col - b->col) * (a->col - b->col));
        };

        auto heuristic = [distance](Node *a, Node *b)
        {
            return distance(a, b);
        };

        auto manhattan = [](Node *a, Node *b)
        {
            return abs(a->row - b->row) + abs(a->col - b->col);
        };

        Node *currentNode;
        nodeStart->distance = 0.0f;
        nodeStart->totaldistance = heuristic(nodeStart, nodeEnd);

        list<Node *> unvisitedNodes;
        unvisitedNodes.push_back(nodeStart);

        while (!unvisitedNodes.empty() && currentNode != nodeEnd)
        {
            unvisitedNodes.sort([](const Node *lhs, const Node *rhs)
                                { return lhs->totaldistance < rhs->totaldistance; });

            while (!unvisitedNodes.empty() && unvisitedNodes.front()->isVisited)
                unvisitedNodes.pop_front();

            currentNode = unvisitedNodes.front();
            currentNode->isVisited = true;
            visitedNodesPath.emplace_back(currentNode);

            for (auto neighbor : currentNode->neighbors)
            {
                float possibleLowerDistance = currentNode->distance + 1;

                if (!neighbor->isVisited && !neighbor->isWall)
                {
                    unvisitedNodes.push_back(neighbor);
                }
                if (possibleLowerDistance < neighbor->distance)
                {
                    neighbor->distance = possibleLowerDistance;
                    neighbor->totaldistance = heuristic(neighbor, nodeEnd);
                    neighbor->parentNode = currentNode;
                }
            }
        }

        if (nodeEnd != nullptr)
        {
            Node *p = nodeEnd->parentNode;
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

EMSCRIPTEN_BINDINGS(bestfsHelper)
{
    emscripten::function<vector<int>>("solveBestFS", &solveBestFS, emscripten::allow_raw_pointers());
    emscripten::function<vector<int>>("returnVector", &returnVector);
    emscripten::register_vector<int>("vector<int>");
}
