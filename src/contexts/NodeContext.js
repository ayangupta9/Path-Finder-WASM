import React, { useState } from 'react'

export const NodeContext = React.createContext()

export const NodeContextProvider = props => {
  const [isStart, setIsStart] = useState(false)
  const [isFinish, setIsFinish] = useState(false)
  const [isCleared, setIsCleared] = useState(true)
  const [startPos, setStartPos] = useState({ row: -1, col: -1 })
  const [finishPos, setFinishPos] = useState({ row: -1, col: -1 })
  const [wallPos, setWallPos] = useState([])
  const [visitedPos, setVisitedPos] = useState([])
  const [pathPos, setPathPos] = useState([])
  const [algoInProgress, setAlgoInProgress] = useState(false)
  const [grid, setGrid] = useState([])
  const [gridWidth, setGridWidth] = useState(40)
  const [gridHeight, setGridHeight] = useState(20)

  return (
    <NodeContext.Provider
      value={{
        grid,
        setGrid,
        isStart,
        setIsStart,
        isFinish,
        setIsFinish,
        isCleared,
        setIsCleared,
        startPos,
        setStartPos,
        finishPos,
        setFinishPos,
        wallPos,
        setWallPos,
        visitedPos,
        setVisitedPos,
        pathPos,
        setPathPos,
        algoInProgress,
        setAlgoInProgress,
        gridWidth,
        setGridWidth,
        gridHeight,
        setGridHeight
      }}
    >
      {props.children}
    </NodeContext.Provider>
  )
}
