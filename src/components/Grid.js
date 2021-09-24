import React, { useContext, useEffect, useState } from 'react'
import Nodepoint from './Nodepoint'
import '../styles/Grid.css'
import { NodeContext } from '../contexts/NodeContext'

const getInitialGrid = () => {
  const grid = []
  for (let col = 0; col < 30; col++) {
    const currentRow = []
    for (let row = 0; row < 15; row++) {
      currentRow.push(createNode(row, col))
    }
    grid.push(currentRow)
  }
  return grid
}

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: false,
    isFinish: false,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null
  }
}

const Grid = props => {
  const {
    isStart,
    isFinish,
    setIsStart,
    setIsFinish,
    isCleared,
    setIsCleared
  } = useContext(NodeContext)
  const [grid, setGrid] = useState([])

  useEffect(() => {
    if (isCleared) {
      setGrid(getInitialGrid())
      console.log(isCleared)
      setIsCleared(false)
      setIsStart(false)
      setIsFinish(false)
    }
  }, [isCleared, setIsCleared])

  useEffect(() => {
    setGrid(getInitialGrid())
  }, [])

  const onNodeClick = (row, col) => {
    let newGrid = grid.slice()
    const node = newGrid[row][col]
    let newNode = {}
    switch (props.choosingOptions) {
      case 'start':
        if (!isStart) {
          newNode = {
            ...node,
            isStart: !node.isStart
          }
          newGrid[row][col] = newNode
          setGrid(newGrid)
          setIsStart(true)
        }
        break
      case 'finish':
        if (!isFinish) {
          newNode = {
            ...node,
            isFinish: !node.isFinish
          }
          newGrid[row][col] = newNode
          setGrid(newGrid)
          setIsFinish(true)
        }
        break
      case 'wall':
        newNode = {
          ...node,
          isWall: !node.isWall
        }
        newGrid[row][col] = newNode
        setGrid(newGrid)
        break
      default:
        break
    }
  }

  return (
    <div id='grid'>
      {grid.map((row, rowId) => {
        return (
          <div key={rowId}>
            {row.map((node, nodeId) => {
              return (
                <Nodepoint
                  grid={grid}
                  setGrid={setGrid}
                  onNodeClick={onNodeClick}
                  choosingOptions={props.choosingOptions}
                  row={node.row}
                  col={node.col}
                  isStart={node.isStart}
                  isFinish={node.isFinish}
                  isWall={node.isWall}
                  isVisited={node.isVisited}
                  key={nodeId}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Grid
