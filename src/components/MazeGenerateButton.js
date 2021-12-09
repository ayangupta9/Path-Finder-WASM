import React, { useContext } from 'react'
import { Button } from 'react-rainbow-components'
import { NodeContext } from '../contexts/NodeContext'
import { getHorizontalWalls } from '../helper/HorizontalMazeHelper'
import { getRandomWalls } from '../helper/RandomMazeHelper'
import { recursiveDivisionMaze } from '../helper/RecursiveMazeHelper'
import { getVerticalWalls } from '../helper/VerticalMazeHelper'

const MazeGenerateButton = props => {
  const {
    startPos,
    finishPos,
    grid,
    setGrid,
    setWallPos,
    gridWidth,
    gridHeight
    // wallPos
  } = useContext(NodeContext)

  // COMMON HELPER FUNCTIONS FOR MAZES

  function setMazeInGrid (finalWalls) {
    let newGrid = grid.slice()

    // CLEAR WALLS
    setWallPos([])
    newGrid.forEach(firstArray => {
      firstArray.forEach(obj => {
        const node = newGrid[obj.row][obj.col]
        let newNode = {
          ...node,
          isWall: false
        }
        newGrid[obj.row][obj.col] = newNode
      })
    })
    setGrid(newGrid)

    // UPDATE WALLS

    const val1 = finalWalls.findIndex(wall => {
      return wall.row === startPos.row && wall.col === startPos.col
    })
    finalWalls.splice(val1, 1)

    const val2 = finalWalls.findIndex(wall => {
      return wall.row === finishPos.row && wall.col === finishPos.col
    })
    finalWalls.splice(val2, 1)

    finalWalls.forEach(wall => {
      const row = wall.row
      const col = wall.col

      const node = newGrid[row][col]

      let newNode = {
        ...node,
        isWall: true
      }
      newGrid[row][col] = newNode
    })
    setGrid(newGrid)
    setWallPos(finalWalls)
  }

  // HORIZONTAL MAZE FUNCTIONS

  function executeHorizontalMazeAlgo (gridWidth, gridHeight) {
    const finalWalls = getHorizontalWalls(
      gridWidth,
      gridHeight,
      startPos,
      finishPos
    )

    if (finalWalls !== false) {
      setMazeInGrid(finalWalls)
    }
  }

  // VERTICAL MAZE FUNCTIONS

  function executeVerticalMazeAlgo (gridWidth, gridHeight) {
    const finalWalls = getVerticalWalls(
      gridWidth,
      gridHeight,
      startPos,
      finishPos
    )

    if (finalWalls !== false) {
      setMazeInGrid(finalWalls)
    }
  }

  // RANDOM MAZE FUNCTIONS

  function executeRandomMazeAlgo (gridWidth, gridHeight) {
    const finalWalls = getRandomWalls(
      gridWidth,
      gridHeight,
      startPos,
      finishPos
    )
    if (finalWalls !== false) {
      setMazeInGrid(finalWalls)
    }
  }

  // RECURSIVE MAZE FUNCTION

  function executeRecursiveMazeAlgo (gridWidth, gridHeight) {
    const finalWalls = recursiveDivisionMaze(
      gridWidth,
      gridHeight,
      startPos,
      finishPos
    )
    if (finalWalls !== false || !finalWalls) {
      setMazeInGrid(finalWalls)
    }
  }

  // // PRIMS MAZE FUNCTION

  // function executePrimsMazeAlgo (gridWidth, gridHeight) {
  //   // getPrimsMazeWalls(gridWidth, gridHeight, startPos, finishPos)
  // }

  return (
    <>
      <Button
        variant='neutral'
        onClick={() => {
          //   console.log(props.mazeOptions)

          switch (props.mazeOptions) {
            case 'horizontalMaze':
              executeHorizontalMazeAlgo(gridWidth, gridHeight)
              break
            case 'verticalMaze':
              executeVerticalMazeAlgo(gridWidth, gridHeight)
              break
            case 'randomMaze':
              executeRandomMazeAlgo(gridWidth, gridHeight)
              break
            case 'recursiveDivision':
              executeRecursiveMazeAlgo(gridWidth, gridHeight)
              // executePrimsMazeAlgo(40, 20)
              break
            default:
          }
        }}
        className='rainbow-m-around_medium'
      >
        GENERATE MAZE
      </Button>
    </>
  )
}

export default MazeGenerateButton
