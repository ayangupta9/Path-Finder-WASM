import React, { useContext } from 'react'
import { Button } from 'react-rainbow-components'
import { astar } from '../algorithms/Astar'
import { dijkstra } from '../algorithms/Dijkstra'
import { bfs } from '../algorithms/BFS'
import 'react-toastify/dist/ReactToastify.css'
import 'animate.css'
import { NodeContext } from '../contexts/NodeContext'
import { toast, ToastContainer } from 'react-toastify'
import { gridHeight, gridWidth } from './Grid'

const StartButton = ({ algorithmOptions }) => {
  const nodeContext = useContext(NodeContext)

  const visualizeAlgo = async () => {
    if (
      (nodeContext.startPos.row === -1 && nodeContext.startPos.col === -1) ||
      (nodeContext.finishPos.row === -1 && nodeContext.finishPos.col === -1)
    ) {
      toast('Set points please!')
      return
    }

    Array.from(document.getElementsByClassName('nodepoint')).forEach(node => {
      node.classList.remove('node-path', 'animate__fadeIn')
    })

    let walls = []

    nodeContext.wallPos.map(w => {
      walls = [w.col, w.row, ...walls]
    })

    const gw = gridWidth
    const gh = gridHeight

    let result

    switch (algorithmOptions) {
      case 'AStar':
        result = await astar(
          nodeContext.startPos.row,
          nodeContext.startPos.col,
          nodeContext.finishPos.row,
          nodeContext.finishPos.col,
          walls,
          gw,
          gh
        )
        break

      case 'Dijkstra':
        result = await dijkstra(
          nodeContext.startPos.row,
          nodeContext.startPos.col,
          nodeContext.finishPos.row,
          nodeContext.finishPos.col,
          walls,
          gw,
          gh
        )
        break

      case 'BFS':
        result = await bfs(
          nodeContext.startPos.row,
          nodeContext.startPos.col,
          nodeContext.finishPos.row,
          nodeContext.finishPos.col,
          walls,
          gw,
          gh
          // gridWidth,
          // gridHeight
        )
        break

      // case 'DFS':
      //   result = await dfs(
      //     nodeContext.startPos.row,
      //     nodeContext.startPos.col,
      //     nodeContext.finishPos.row,
      //     nodeContext.finishPos.col,
      //     walls,
      //     gridWidth,
      //     gridHeight
      //   )
      //   break

      default:
        break
    }

    let resultIterator = 0
    setInterval(() => {
      if (resultIterator === result.length) {
        clearInterval()
        return
      }

      let element = document.getElementsByClassName(
        `${result[resultIterator].second}-${result[resultIterator].first}`
      )[0]

      if (element !== undefined) {
        element.classList.add('node-path', 'animate__fadeIn')
      }
      resultIterator = resultIterator + 1
    }, 30)
  }

  return (
    <>
      <Button
        onClick={async () => {
          await visualizeAlgo()
        }}
        style={{
          width: 200
        }}
        label='VISUALIZE'
        variant='neutral'
        className='rainbow-m-around_medium'
      />
      <ToastContainer
        pauseOnHover={false}
        position='bottom-right'
        autoClose={3000}
        theme='dark'
      />
    </>
  )
}

export default StartButton
