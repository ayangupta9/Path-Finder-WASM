import React, { useCallback, useContext, useEffect, useState } from 'react'
import Nodepoint from './Nodepoint'
import '../styles/Grid.css'
import { NodeContext } from '../contexts/NodeContext'

// const gridWidth = 40
// const gridHeight = 20

const Grid = props => {
  const {
    grid,
    setGrid,
    isStart,
    isFinish,
    setIsStart,
    setIsFinish,
    isCleared,
    setIsCleared,
    // startPos,
    setStartPos,
    // finishPos,
    setFinishPos,
    wallPos,
    setWallPos,
    gridWidth,
    gridHeight
  } = useContext(NodeContext)
  const [mousePressed, setMousePressed] = useState(false)

  const getInitialGrid = (gw, gh) => {
    const grid = []
    for (let col = 0; col < gw; col++) {
      const currentRow = []
      for (let row = 0; row < gh; row++) {
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

  const clearGrid = useCallback(() => {
    console.log(56)
    Array.from(document.getElementsByClassName('node-path')).forEach(node => {
      node.classList.remove('node-path')
    })
    Array.from(document.getElementsByClassName('node-visited')).forEach(
      node => {
        node.classList.remove('node-visited')
      }
    )
    setIsCleared(false)
    setIsStart(false)
    setIsFinish(false)
    setStartPos({ row: -1, col: -1 })
    setFinishPos({ row: -1, col: -1 })
    setWallPos([])
    console.log(71)
    // eslint-disable-next-line
  }, [])

  const handleMouseDown = (row, col) => {
    if (props.choosingOptions === 'wall') {
      let newGrid = grid.slice()
      const node = newGrid[row][col]

      let newNode = {
        ...node,
        isWall: !node.isWall
      }
      newGrid[row][col] = newNode
      setGrid(newGrid)

      if (newNode.isWall) {
        setWallPos([...wallPos, { row: row, col: col }])
      } else {
        let result = []
        console.log(wallPos)
        wallPos.forEach(pos => {
          if (pos.row === row && pos.col === col) {
          } else {
            result.push(pos)
          }
        })
        setWallPos(result)
      }
      setMousePressed(true)
    }
  }

  const handleMouseEnter = (row, col) => {
    if (!mousePressed) {
      return
    }

    let newGrid = grid.slice()
    const node = newGrid[row][col]

    let newNode = {
      ...node,
      isWall: !node.isWall
    }
    newGrid[row][col] = newNode
    setGrid(newGrid)

    if (newNode.isWall) {
      setWallPos([...wallPos, { row: row, col: col }])
    } else {
      let result = []
      console.log(wallPos)
      wallPos.forEach(pos => {
        if (pos.row === row && pos.col === col) {
        } else {
          result.push(pos)
        }
      })
      setWallPos(result)
    }
  }

  const handleMouseUp = () => {
    setMousePressed(false)
  }

  useEffect(() => {
    console.log(isCleared)
    if (isCleared === true) {
      clearGrid()
      setGrid(getInitialGrid(gridWidth, gridHeight))
      // setIsCleared(false)
    }
  }, [isCleared])

  useEffect(() => {
    setGrid(getInitialGrid(gridWidth, gridHeight))
    clearGrid()
  }, [])

  useEffect(() => {
    setGrid(getInitialGrid(gridWidth, gridHeight))
    clearGrid()
  }, [gridWidth, gridHeight])

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
          setStartPos({ row: row, col: col })
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
          setFinishPos({ row: row, col: col })
        }
        break
      default:
        break
    }
  }

  return (
    <div id='grid' ref={NodeContext.nodeRef}>
      {grid.map((row, rowId) => {
        return (
          <div key={rowId}>
            {row.map((node, nodeId) => {
              return (
                <Nodepoint
                  onNodeClick={onNodeClick}
                  choosingOptions={props.choosingOptions}
                  row={node.row}
                  col={node.col}
                  isStart={node.isStart}
                  isFinish={node.isFinish}
                  isWall={node.isWall}
                  isVisited={node.isVisited}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseEnter={handleMouseEnter}
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
