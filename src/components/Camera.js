import { PerspectiveCamera } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'

const Camera = props => {
  const ref = useRef()
  const set = useThree(state => state.set)
  const [pos, setPos] = useState([10, 10, -10])

  useEffect(() => {
    if (props.firstPerson) {
      setPos([props.startPos.col, props.startPos.row, 0])
    } else {
      setPos([10, 10, -10])
    }
  }, [props, pos])

  useEffect(() => {
    void set({ camera: ref.current })
  }, [set])

  return <PerspectiveCamera near={0.01} position={pos} ref={ref} {...props} />
}

export default Camera
