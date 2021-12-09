import { OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import { PointerLockControls } from '@react-three/drei'

const ThreeDControls = props => {
  const {
    camera,
    gl: { domElement }
  } = useThree()

  const controlsRef = useRef()
  const controls = useRef()

  return (
    <>
      {props.firstPerson ? (
        <PointerLockControls
          minPolarAngle={0}
          onUpdate={() => {
            if (controlsRef.current && props.firstPerson) {
              controlsRef.current.addEventListener('lock', () => {
                console.log('lock')
                props.setIsLocked(true)
                camera.position.set(...props.initCameraPos)
              })
              controlsRef.current.addEventListener('unlock', () => {
                console.log('unlock')
                props.setIsLocked(false)
              })

              onkeydown = event => {
                switch (event.code) {
                  case 'ArrowUp':
                  case 'KeyW':
                    camera.translateZ(-0.1)
                    camera.position.y = 0
                    break

                  case 'ArrowDown':
                  case 'KeyS':
                    camera.translateZ(0.1)
                    camera.position.y = 0
                    break

                  default:
                }
              }
            }
          }}
          ref={controlsRef}
        />
      ) : (
        <OrbitControls
          keyPanSpeed={10}
          maxPolarAngle={Math.PI / 2 + Math.PI / 75}
          minPolarAngle={0}
          maxDistance={20}
          listenToKeyEvents={window}
          ref={controls}
          args={[camera, domElement]}
        />
      )}
    </>
  )
}

export default ThreeDControls
