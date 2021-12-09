import React, { useState } from 'react'
import AlgorithmSelect from './AlgorithmSelect'
import ClearButton from './ClearButton'
import Filters from './Filters'
import Grid from './Grid'
import GridChanger from './GridChanger'
import Header from './Header'
// import LoadPreviousButton from './LoadPreviousButton'
import MazeGenerateButton from './MazeGenerateButton'
import MazeSelect from './MazeSelect'
import StartButton from './StartButton'
import ThreeDShowButton from './ThreeDShowButton'

const Home = () => {
  const [choosingOptions, setChoosingOptions] = useState('start')
  const [algorithmOptions, setAlgorithmOptions] = useState('Dijkstra')
  const [mazeOptions, setMazeOptions] = useState('horizontalMaze')

  // const clearGridRef = useRef(null)

  return (
    <main>
      <div className='home'>
        <Header />
        <div
          className='options'
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            gap: '20px',
            width: '100%'
            // backgroundColor: 'red'
          }}
        >
          <AlgorithmSelect
            algorithmOptions={algorithmOptions}
            setAlgorithmOptions={setAlgorithmOptions}
          />

          <Filters
            choosingOptions={choosingOptions}
            setChoosingOptions={setChoosingOptions}
          />

          <GridChanger />
          {/* <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              gap: '30px',
              // backgroundColor: 'lightblue',
              width: '100%'
            }}
          >
           
          </div> */}
        </div>
        <br />

        <Grid choosingOptions={choosingOptions} />

        <br />
        <div
          style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <MazeSelect
              mazeOptions={mazeOptions}
              setMazeOptions={setMazeOptions}
            />
            <MazeGenerateButton
              mazeOptions={mazeOptions}
              setMazeOptions={setMazeOptions}
            />
          </div>

          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center'
              // gap: '30px'
            }}
          >
            <ClearButton /*buttonRef={clearGridRef}*/ />
            <ThreeDShowButton />
            {/* <LoadPreviousButton /> */}
          </div>
          <div>
            <StartButton algorithmOptions={algorithmOptions} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
