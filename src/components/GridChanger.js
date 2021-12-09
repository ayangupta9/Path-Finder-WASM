import React, { useContext } from 'react'
import { ButtonIcon } from 'react-rainbow-components'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { NodeContext } from '../contexts/NodeContext'
const GridChanger = () => {
  const { gridWidth, gridHeight, setGridWidth, setGridHeight } = useContext(
    NodeContext
  )

  return (
    <div
      aria-label='Grid size'
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <legend className='sc-iRbamj cXWeGk sc-dOkuiw lglUut sc-dOkuiw lglUut'>
        Grid Size
      </legend>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <h3
          style={{
            marginTop: '0px',
            marginBottom: '0px'
          }}
        >
          {gridWidth} x {gridHeight}
        </h3>

        <div className='rainbow-p-right_large'>
          <ButtonIcon
            onClick={() => {
              if (gridWidth < 60) {
                setGridWidth(gridWidth + 2)
              }
              if (gridHeight < 30) {
                setGridHeight(gridHeight + 2)
              }
            }}
            variant='neutral'
            icon={<FaPlus />}
          />
        </div>

        <div className='rainbow-p-right_large'>
          <ButtonIcon
            onClick={() => {
              if (gridWidth > 40) {
                setGridWidth(gridWidth - 2)
              }
              if (gridHeight > 20) {
                setGridHeight(gridHeight - 2)
              }
            }}
            variant='neutral'
            icon={<FaMinus />}
          />
        </div>
      </div>
    </div>
  )
}

export default GridChanger
