import React, { useEffect, useState } from 'react'
import { Select } from 'react-rainbow-components'

const MazeSelect = props => {
  const [value, setValue] = useState(props.mazeOptions)

  const { setMazeOptions } = props

  const handleChange = event => {
    const val = event.target.value
    setValue(val)
  }

  useEffect(() => {
    setMazeOptions(value)
  }, [value, setMazeOptions])

  const options = [
    { value: 'horizontalMaze', label: 'Horizontal Maze' },
    { value: 'randomMaze', label: 'Random Maze' },
    { value: 'recursiveDivision', label: 'Recursive Division' },
    { value: 'verticalMaze', label: 'Vertical Maze' }
  ]

  return <Select options={options} value={value} onChange={handleChange} />
}

export default MazeSelect
