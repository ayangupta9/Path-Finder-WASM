import React, { useContext } from 'react'
import { NodeContext } from '../contexts/NodeContext'
import { Button } from 'react-rainbow-components'

const ClearButton = () => {
  const { isCleared, setIsCleared } = useContext(NodeContext)

  function onButtonClick () {
    if (!isCleared) {
      console.log(isCleared)
      setIsCleared(true)
    }
  }

  return (
    <Button
      onClick={onButtonClick}
      label='CLEAR GRID'
      variant='neutral'
      className='rainbow-m-around_medium'
    />
  )
}

export default ClearButton
