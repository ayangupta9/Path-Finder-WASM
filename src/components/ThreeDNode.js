import { Box, Html } from '@react-three/drei'
import React, { useEffect } from 'react'
import { Avatar } from 'react-rainbow-components'
import { DoubleSide } from 'three'

const Wall = props => {
  const positionExpression = position => {
    if (position === 2) return -0.95
    else if (position === 1) return -0.5
    else return -0.25
  }

  const wallHeight = Math.floor(Math.random() * 2 + 1)

  return (
    <Box
      args={[0.47, 0.47, wallHeight]}
      rotation={[0, 0, Math.PI / 2]}
      position={[
        props.wallposition[0],
        props.wallposition[1],
        positionExpression(wallHeight)
      ]}
    >
      <meshLambertMaterial
        side={DoubleSide}
        opacity={0.5}
        transparent={true}
        attach='material'
        color={'#0c3547'}
      />
    </Box>
  )
}

const ThreeDNode = props => {
  useEffect(() => {
    if (props.nodeColor === 0x008000) {
      props.setInitCameraPos([
        -1 * props.position[0],
        0,
        -1 * props.position[1]
      ])
    }
  }, [])

  return (
    <>
      {props.isWall === false ? (
        <mesh position={props.position}>
          {props.firstPerson === true ? (
            <Html>
              <h1
                style={{
                  fontSize: '5em'
                }}
              >
                {props.sign}
              </h1>
            </Html>
          ) : (
            ''
          )}

          <planeBufferGeometry args={[0.47, 0.47]} attach='geometry' />
          <meshBasicMaterial
            color={props.nodeColor}
            side={DoubleSide}
            attach='material'
          />
        </mesh>
      ) : (
        <Wall wallposition={props.position} />
      )}
    </>
  )
}

export default ThreeDNode
