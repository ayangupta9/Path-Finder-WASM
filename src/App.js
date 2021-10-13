import { useEffect, useState } from 'react'
import './App.css'
import AlgorithmSelect from './components/AlgorithmSelect'
import ClearButton from './components/ClearButton'
import Filters from './components/Filters'
import Grid from './components/Grid'
import Header from './components/Header'
import StartButton from './components/StartButton'
import NodeContextProvider from './contexts/NodeContext'
function App () {
  const [choosingOptions, setChoosingOptions] = useState('start')
  const [algorithmOptions, setAlgorithmOptions] = useState('Dijkstra')

  // useEffect(() => {
  //   console.log(choosingOptions)
  //   console.log(algorithmOptions)
  // }, [choosingOptions, algorithmOptions])

  return (
    <div className='App'>
      <NodeContextProvider>
        <Header />
        <div
          className='options'
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center'
          }}
        >
          <Filters
            choosingOptions={choosingOptions}
            setChoosingOptions={setChoosingOptions}
          />
          <AlgorithmSelect
            algorithmOptions={algorithmOptions}
            setAlgorithmOptions={setAlgorithmOptions}
          />
        </div>
        <br />
        <Grid choosingOptions={choosingOptions} />
        <br />
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '30px'
          }}
        >
          <ClearButton />
          <StartButton algorithmOptions={algorithmOptions} />
        </div>
      </NodeContextProvider>
    </div>
  )
}

export default App
