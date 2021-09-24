import React from 'react'

const Header = () => {
  return (
    <div
      style={{
        position: 'absolute',
        fontSize: '25px',
        fontWeight: 'w100',
        display: 'flex',
        width: '100%',
        top: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        textShadow: '2px 2px lightcoral'
      }}
      className='header'
    >
      <h1>PATH FINDER</h1>
    </div>
  )
}

export default Header
