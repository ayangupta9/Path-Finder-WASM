import { usePlane } from '@react-three/cannon'
import React from 'react'
import { DoubleSide } from 'three'
import ThreeDGrid from './ThreeDGrid'

const ThreeDBase = props => {
  const { nodeContext } = props

  const [ref] = usePlane(() => ({
    position: props.position,
    rotation: [-Math.PI / 2, 0, 0]
    // mass: 1
  }))

  const planeWidth = nodeContext.gridWidth / 2 + 0.5
  const planeHeight = nodeContext.gridHeight / 2 + 0.5

  return (
    <>
      <mesh position={props.position} ref={ref}>
        <planeBufferGeometry args={[planeWidth, planeHeight]} />
        <meshBasicMaterial side={DoubleSide} color={'#000000'} />
        <ThreeDGrid
          setInitCameraPos={props.setInitCameraPos}
          firstPerson={props.firstPerson}
          startPos={nodeContext.startPos}
          finishPos={nodeContext.finishPos}
          wallPos={nodeContext.wallPos}
          visitedPos={nodeContext.visitedPos}
          pathPos={nodeContext.pathPos}
          gridWidth={nodeContext.gridWidth}
          gridHeight={nodeContext.gridHeight}
          position={[0, 0, 0.05]}
        />
      </mesh>
    </>
  )
}

export default ThreeDBase
