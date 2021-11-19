import React, { useEffect, useRef, useState } from 'react'

export const NodeContext = React.createContext()

const NodeContextProvider = props => {
  const [isStart, setIsStart] = useState(false)
  const [isFinish, setIsFinish] = useState(false)
  const [isCleared, setIsCleared] = useState(false)
  const [startPos, setStartPos] = useState({ row: -1, col: -1 })
  const [finishPos, setFinishPos] = useState({ row: -1, col: -1 })
  const [wallPos, setWallPos] = useState([])
  const [algoInProgress, setAlgoInProgress] = useState(false)
  return (
    <NodeContext.Provider
      value={{
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
        algoInProgress,
        setAlgoInProgress
      }}
    >
      {props.children}
    </NodeContext.Provider>
  )
}

export default NodeContextProvider
