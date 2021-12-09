import React, { useContext } from 'react'
import { NodeContext } from '../contexts/NodeContext'
import { Button } from 'react-rainbow-components'
import { FaEraser } from 'react-icons/fa'

const ClearButton = () => {
  const { isCleared, setIsCleared } = useContext(NodeContext)

  function onButtonClick () {
    if (!isCleared) {
      setIsCleared(true)
    }
  }

  return (
    <Button
    id="clearGridButton"
      style={{
        width: 200,
        flex: 1,
        marginRight: '10px'
      }}
      onClick={onButtonClick}
      variant='neutral'
      className='rainbow-m-around_medium'
    >
      <FaEraser />
      &nbsp;CLEAR GRID
    </Button>
  )
}

export default ClearButton
