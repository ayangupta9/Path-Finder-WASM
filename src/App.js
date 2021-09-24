import { useEffect, useState } from 'react'
import './App.css'
import ClearButton from './components/ClearButton'
import Filters from './components/Filters'
import Grid from './components/Grid'
import Header from './components/Header'
import NodeContextProvider from './contexts/NodeContext'
function App () {
  const [choosingOptions, setChoosingOptions] = useState('start')

  useEffect(() => {
    console.log(choosingOptions)
  }, [choosingOptions])

  return (
    <div className='App'>
      <NodeContextProvider>
        <Header />
        <div
          className='options'
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          <ClearButton />
          <br />
          <Filters
            choosingOptions={choosingOptions}
            setChoosingOptions={setChoosingOptions}
          />
        </div>
        <br />
        <Grid choosingOptions={choosingOptions} />
      </NodeContextProvider>
    </div>
  )
}

export default App
