import React from 'react'

const ControlsInfo = props => {
  return (
    <>
      {props.firstPerson ? (
        <div
          style={{
            display: 'flex',
            zIndex: '3',
            width: '300px',
            padding: '20px',
            position: 'absolute',
            right: '0',
            top: '0',
            background: 'white',
            flexDirection: 'column',
            textAlign: 'center'
          }}
        >
          <h1>First Person Controls</h1>
          <h3>
            Press <b>W</b> to move forward
          </h3>
          <h3> Move the mouse to pan camera</h3>
          <h3>
            Press <b>Esc</b> to escape first person mode
          </h3>
          <h3>
            When not in First Person Mode, click anywhere for First Person Mode
          </h3>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            width: '300px',
            zIndex: '3',
            padding: '20px',
            background: 'white',
            position: 'absolute',
            right: '0',
            top: '0',
            flexDirection: 'column',
            textAlign: 'center'
          }}
        >
          <h1>Third Person Controls</h1>
          <h3> Hold LMB and move the mouse to rotate camera</h3>
          <h3> Hold RMB and move the mouse to pan camera</h3>
          <h3> Use scroll wheel to zoom in or out</h3>
        </div>
      )}
    </>
  )
}

export default ControlsInfo
