import React, { useState } from 'react'
import { Select } from 'react-rainbow-components'

const AlgorithmSelect = props => {
  const [value, setValue] = useState(props.algorithmOptions)

  const handleChange = event => {
    const val = event.target.value
    setValue(val)
    props.setAlgorithmOptions(val)
  }

  const options = [
    { value: 'AStar', label: 'A Star' },
    { value: 'BFS', label: 'Breadth First Search' },
    // { value: 'DFS', label: 'Depth First Search' },
    { value: 'Dijkstra', label: 'Dijkstra' }
  ]

  return (
    <>
      <Select options={options} value={value} onChange={handleChange} />
    </>
  )
}

export default AlgorithmSelect
