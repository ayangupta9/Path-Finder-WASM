import { useContext } from '@react-three/flex'
import React from 'react'
import {  FaCubes } from 'react-icons/fa'
import { Button } from 'react-rainbow-components'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { NodeContext } from '../contexts/NodeContext'

const ThreeDShowButton = () => {
  const nodeContext = useContext(NodeContext)

  const navigate = useNavigate()
  return (
    <>
      <Button
        onClick={() => {
          if (!nodeContext.isStart || !nodeContext.isFinish) {
            toast('How about we do it on 2D first? Yeah?')
          } else {
            navigate('/threed')
          }
        }}
        style={{
          width: 200,
          flex: 1,
          marginLeft: '10px',
          marginRight: '10px'
        }}
        variant='neutral'
        className='rainbow-m-around_medium'
      >
        <FaCubes />
        &nbsp;3D DEPICTION
      </Button>

      <ToastContainer
        pauseOnHover={false}
        position='bottom-right'
        autoClose={3000}
        theme='dark'
      />
    </>
  )
}

export default ThreeDShowButton
