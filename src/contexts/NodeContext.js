import React, { useState } from 'react'

export const NodeContext = React.createContext()

const NodeContextProvider = props => {
  const [isStart, setIsStart] = useState(false)
  const [isFinish, setIsFinish] = useState(false)
  const [isCleared, setIsCleared] = useState(false)
  return (
    <NodeContext.Provider
      value={{
        isStart,
        setIsStart,
        isFinish,
        setIsFinish,
        isCleared,
        setIsCleared
      }}
    >
      {props.children}
    </NodeContext.Provider>
  )
}

export default NodeContextProvider
