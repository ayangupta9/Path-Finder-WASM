import React from 'react'
import { Button } from 'react-rainbow-components'
import { FaBackward } from 'react-icons/fa'

const LoadPreviousButton = () => {
  return (
    <>
      <Button
        style={{
          width: 200,
          flex: 1,
          marginLeft: '10px'
        }}
        // label='LOAD PREVIOUS'
        variant='neutral'
        className='rainbow-m-around_medium'
      >
        <FaBackward />
        &nbsp;LOAD PREVIOUS
      </Button>
    </>
  )
}

export default LoadPreviousButton
