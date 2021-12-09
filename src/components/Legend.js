import React from 'react'

const LegendValue = props => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '10px',
        padding: '0px',
        width: '100%',
        gap: '20px'
      }}
    >
      <div
        className='keyColor'
        style={{
          width: '15px',
          height: '15px',
          backgroundColor: `${props.color}`,
          flex: 1
        }}
        id={props.keyId}
      ></div>
      <h3
        style={{
          flex: 5,
          padding: '0px',
          margin: '0px'
        }}
      >
        {props.keyValue}
      </h3>
    </div>
  )
}

const Legend = () => {
  return (
    <div
      style={{
        position: 'absolute',
        zIndex:'3',
        right: '0px',
        bottom: '0px',
        margin: '30px',
        backgroundColor: 'white',
        width: '200px',
        boxShadow: '0px 0px 5px 1px #dcdcdc',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '15px'
      }}
    >
      <h2
        style={{
          margin: '5px'
        }}
      >
        LEGEND
      </h2>
      <LegendValue
        color={'#008000'}
        keyId={'startNodeKey'}
        keyValue={'Start Node'}
      />
      <LegendValue
        color={'#ff0000'}
        keyId={'finishNodeKey'}
        keyValue={'Finish Node'}
      />
      <LegendValue
        color={'#ffff00'}
        keyId={'pathNodeKey'}
        keyValue={'Path Node'}
      />
      <LegendValue
        color={'#4BB6E6'}
        keyId={'visitedNodeKey'}
        keyValue={'Visited Node'}
      />
    </div>
  )
}

export default Legend
