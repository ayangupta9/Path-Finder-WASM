#include <iostream>
#include <list>
#include <vector>
#include <algorithm>
#include <stack>
#include <emscripten.h>
#include <emscripten/bind.h>

using namespace std;

struct Node
{
    int row;
    int col;
    bool isVisited = false;
    bool isWall = false;
    Node *parentNode;
    vector<Node *> neighbors;
};

extern "C"
{
    vector<int> returnVector()
    {
        vector<int> vec;
        return vec;
    }

    vector<int> solveDFS(vector<int> walls, int startRow, int startCol, int endRow, int endCol, int rowCount, int colCount)
    {
        Node *nodes = new Node[rowCount * colCount];
        vector<Node *> optimumPath;
        vector<Node *> visitedNodesPath;
        stack<Node *> nodesStack;

        for (int i = 0; i < rowCount; i++)
        {
            for (int j = 0; j < colCount; j++)
            {
                nodes[j * rowCount + i].row = i;
                nodes[j * rowCount + i].col = j;
                nodes[j * rowCount + i].parentNode = nullptr;
                nodes[j * rowCount + i].isVisited = false;
                nodes[j * rowCount + i].isWall = false;

                if (i > 0)
                    nodes[j * rowCount + i].neighbors.emplace_back(&nodes[(j)*rowCount + (i - 1)]);
                if (i < rowCount - 1)
                    nodes[j * rowCount + i].neighbors.emplace_back(&nodes[(j)*rowCount + (i + 1)]);
                if (j > 0)
                    nodes[j * rowCount + i].neighbors.emplace_back(&nodes[(j - 1) * rowCount + (i)]);
                if (j < colCount - 1)
                    nodes[j * rowCount + i].neighbors.emplace_back(&nodes[(j + 1) * rowCount + (i)]);
            }
        }

        for (int i = 0; i < walls.size() - 1; i += 2)
            nodes[walls[i] * rowCount + walls[i + 1]].isWall = true;

        Node *startNode = &nodes[startCol * rowCount + startRow];
        Node *endNode = &nodes[endCol * rowCount + endRow];

        Node *currentNode;
        nodesStack.push(startNode);

        while (!nodesStack.empty())
        {
            currentNode = nodesStack.top();
            nodesStack.pop();
            currentNode->isVisited = true;
            visitedNodesPath.emplace_back(currentNode);

            if (currentNode == endNode)
                break;

            for (auto neighbor : currentNode->neighbors)
            {
                if (!neighbor->isWall && !neighbor->isVisited)
                {
                    neighbor->parentNode = currentNode;
                    nodesStack.push(neighbor);
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

EMSCRIPTEN_BINDINGS(dfsHelper)
{
    emscripten::function<vector<int>>("solveDFS", &solveDFS, emscripten::allow_raw_pointers());
    emscripten::function<vector<int>>("returnVector", &returnVector);
    emscripten::register_vector<int>("vector<int>");
}