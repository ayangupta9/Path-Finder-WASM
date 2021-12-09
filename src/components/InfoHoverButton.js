import React, { useEffect, useState } from 'react'
import { FaInfo } from 'react-icons/fa'
import ControlsInfo from './ControlsInfo'

const InfoHoverButton = props => {
  const [infoHover, setInfoHover] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setInfoHover(false)
    }, 3000)
  }, [])

  return (
    <div
      style={{
        position: 'absolute',
        right: '0',
        top: '0',
        margin: '10px',
        backgroundColor: 'lightblue',
        zIndex: '5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
        width: '50px',
        borderRadius: '50%',
        height: '50px'
      }}
      onPointerEnter={() => {
        setInfoHover(true)
      }}
      onPointerLeave={() => {
        setInfoHover(false)
      }}
    >
      <FaInfo />
      {infoHover ? <ControlsInfo firstPerson={props.firstPerson} /> : ''}
    </div>
  )
}

export default InfoHoverButton
