import React, { useEffect, useState } from 'react'
import '../styles/Nodepoint.css'

const Nodepoint = props => {
  const [nodeClass, setNodeClass] = useState('')

  useEffect(() => {
    const xclass = props.isFinish
      ? 'node-finish'
      : props.isStart
      ? 'node-start'
      : props.isWall
      ? 'node-wall'
      : ''

    setNodeClass(xclass)
  }, [props])

  return (
    <div
      onClick={() => {
        props.onNodeClick(props.row, props.col)
      }}
      className={`${nodeClass} ${props.row}-${props.col}`}
      id={'node'}
    ></div>
  )
}

export default Nodepoint
