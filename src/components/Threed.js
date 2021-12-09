import React, { useContext, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Camera from './Camera'
import { NodeContext } from '../contexts/NodeContext'
import ThreeDControls from './ThreeDControls'
import Legend from './Legend'
import { Debug, Physics } from '@react-three/cannon'
import ThreeDBase from './ThreeDBase'
import { useNavigate } from 'react-router'
import InfoHoverButton from './InfoHoverButton'
import { FaCamera, FaCameraRetro } from 'react-icons/fa'

const SwitchToFirstPerson = props => {
  return (
    <div
      className='firstPersonSwitch'
      style={{
        position: 'absolute',
        left: '0px',
        top: '0px',
        margin: '20px',
        padding: '15px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '85px',
        height: '50px',
        borderRadius: '20px',
        backgroundColor: 'lightblue',
        fontWeight: '900',
        zIndex: '3',
        cursor: 'pointer'
      }}
      onClick={() => {
        props.setFirstPerson(!props.firstPerson)
      }}
    >
      {props.firstPerson ? 'THIRD PERSON' : 'FIRST PERSON'}
      <FaCamera
        size={100}
        style={{
          marginLeft: '10px'
        }}
      />
    </div>
  )
}

const UnlockedPointerModal = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '3',
        position: 'absolute',
        left: '0',
        marginLeft: 'auto',
        right: '0',
        marginRight: 'auto',
        top: '0',
        marginTop: 'auto',
        bottom: '0',
        marginBottom: 'auto',
        width: '50%',
        height: '50%',
        borderRadius: '20px',
        color: 'white',
        fontSize: '2em',
        backgroundColor: '#333333',
        opacity: '0.5',
        textAlign: 'center'
      }}
    >
      <h4>Click here to enter First Person Mode</h4>
    </div>
  )
}

const Threed = () => {
  const nodeContext = useContext(NodeContext)

  const [firstPerson, setFirstPerson] = useState(false)
  const [initCameraPos, setInitCameraPos] = useState(null)
  const [isLocked, setIsLocked] = useState(false)

  const navigate = useNavigate()
  useEffect(() => {
    if (nodeContext.startPos.row === -1 && nodeContext.startPos.col === -1) {
      navigate('/')
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className={'ThreeD'}>
      <SwitchToFirstPerson
        firstPerson={firstPerson}
        setFirstPerson={setFirstPerson}
      />

      <Legend />
      <InfoHoverButton firstPerson={firstPerson} />

      {isLocked === false && firstPerson === true ? (
        <UnlockedPointerModal />
      ) : (
        ''
      )}

      <Canvas
        concurrent
        raycaster={{
          computeOffsets: (_, { size: { width, height } }) => {
            if (isLocked.current) {
              return {
                offsetX: width / 2,
                offsetY: height / 2
              }
            } else {
              return null
            }
          }
        }}
      >
        <Physics>
          <Debug color='black' scale={1.1}>
            <Camera
              startPos={nodeContext.startPos}
              fov={50}
              firstPerson={firstPerson}
            />
            <ThreeDControls
              initCameraPos={initCameraPos}
              startPos={nodeContext.startPos}
              firstPerson={firstPerson}
              isLocked={isLocked}
              setIsLocked={setIsLocked}
            />
            <ambientLight color={'#ffffff'} intensity={1.5} />
            <pointLight
              castShadow={true}
              position={[0, 10, 0]}
              intensity={0.4}
            />
            <group>
              {/* <Box
                castShadow={true}
                position={[4,0, -4]}
                args={[1, 1, 1]}
              >
                <meshPhongMaterial
                  attach='material'
                  color='#000000'
                  wireframe
                />
              </Box> */}

              <ThreeDBase
                setInitCameraPos={setInitCameraPos}
                firstPerson={firstPerson}
                nodeContext={nodeContext}
                position={[0, -1, 0]}
              />
            </group>
          </Debug>
        </Physics>
      </Canvas>
    </div>
  )
}

export default Threed
