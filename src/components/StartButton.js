import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-rainbow-components'
import { astar } from '../algorithms/Astar'
import { dijkstra } from '../algorithms/Dijkstra'
import { bfs } from '../algorithms/BFS'
import 'react-toastify/dist/ReactToastify.css'
import 'animate.css'
import { NodeContext } from '../contexts/NodeContext'
import { toast, ToastContainer } from 'react-toastify'
import { gridHeight, gridWidth } from './Grid'
import { dfs } from '../algorithms/DFS'
import { bestfs } from '../algorithms/BestFirstSearch'
import { testWasm } from '../algorithms/testWasm'

const StartButton = ({ algorithmOptions }) => {
  const nodeContext = useContext(NodeContext)

  const [isVisualize, setIsVisualize] = useState(false)

  // useEffect(async () => {
  //   await testWasm()
  // }, [])

  const visualizeOptimumPath = result => {
    let optimumPathArray = result.optimumPathArray
    // console.log(optimumPathArray)
    if (optimumPathArray.length === 0) {
      toast('No path available')
    } else {
      let resultIterator = 0
      optimumPathArray.reverse()
      setInterval(() => {
        if (resultIterator === optimumPathArray.length) {
          clearInterval()
          return
        }

        let element = document.getElementsByClassName(
          `${optimumPathArray[resultIterator].second}-${optimumPathArray[resultIterator].first}`
        )[0]

        if (element !== undefined) {
          element.classList.remove('node-visited')
          element.classList.add('node-path', 'animate__fadeIn')
        }
        resultIterator = resultIterator + 1
      }, 30)
    }
  }

  const visualizeVisitedNodes = result => {
    let visitedNodesArray = result.visitedNodesArray

    let arrayIterator = 0
    setInterval(() => {
      if (
        arrayIterator === visitedNodesArray.length ||
        (visitedNodesArray[arrayIterator].second ===
          nodeContext.finishPos.row &&
          visitedNodesArray[arrayIterator].first === nodeContext.finishPos.col)
      ) {
        clearInterval()
        return
      }

      let element = document.getElementsByClassName(
        `${visitedNodesArray[arrayIterator].second}-${visitedNodesArray[arrayIterator].first}`
      )[0]

      if (element !== undefined) {
        element.classList.add('node-visited', 'animate__fadeIn')
      }

      arrayIterator = arrayIterator + 1
    }, 10)
  }

  const visualizeAlgo = async () => {
    if (
      (nodeContext.startPos.row === -1 && nodeContext.startPos.col === -1) ||
      (nodeContext.finishPos.row === -1 && nodeContext.finishPos.col === -1)
    ) {
      toast('Set points please!')
      return
    }

    Array.from(document.getElementsByClassName('nodepoint')).forEach(node => {
      node.classList.remove('node-path', 'note-visited', 'animate__fadeIn')
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
        )
        break

      case 'DFS':
        result = await dfs(
          nodeContext.startPos.row,
          nodeContext.startPos.col,
          nodeContext.finishPos.row,
          nodeContext.finishPos.col,
          walls,
          gw,
          gh
        )
        break

      case 'BestFS':
        result = await bestfs(
          nodeContext.startPos.row,
          nodeContext.startPos.col,
          nodeContext.finishPos.row,
          nodeContext.finishPos.col,
          walls,
          gw,
          gh
        )
        break

      default:
        break
    }

    visualizeVisitedNodes(result)
    setTimeout(() => {
      visualizeOptimumPath(result)
    }, 10 * result.visitedNodesArray.length)
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
