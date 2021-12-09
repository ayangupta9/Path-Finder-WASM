import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Threed from './components/Threed'
import { NodeContextProvider } from './contexts/NodeContext'

function App () {
  return (
    <div className='App'>
      <NodeContextProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/threed' element={<Threed />} />
          </Routes>
        </BrowserRouter>
      </NodeContextProvider>
    </div>
  )
}

export default App
