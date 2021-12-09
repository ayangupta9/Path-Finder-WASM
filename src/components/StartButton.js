import React, { useContext } from 'react'
import { Button } from 'react-rainbow-components'
import { astar } from '../algorithms/Astar'
import { dijkstra } from '../algorithms/Dijkstra'
import { bfs } from '../algorithms/BFS'
import 'react-toastify/dist/ReactToastify.css'
import 'animate.css'
import { NodeContext } from '../contexts/NodeContext'
import { toast, ToastContainer } from 'react-toastify'
// import { gridHeight, gridWidth } from './Grid'
import { dfs } from '../algorithms/DFS'
import { bestfs } from '../algorithms/BestFirstSearch'
import { FaPlay } from 'react-icons/fa'

const StartButton = ({ algorithmOptions }) => {
  const nodeContext = useContext(NodeContext)

  const visualizeOptimumPath = result => {
    let optimumPathArray = result.optimumPathArray
    // console.log(optimumPathArray)
    if (optimumPathArray.length === 0) {
      toast('No path available')
    } else {
      let resultIterator = 0
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

    Array.from(document.getElementsByClassName('node-path')).forEach(node => {
      node.classList.remove('node-path', 'animate__fadeIn')
    })
    Array.from(document.getElementsByClassName('node-visited')).forEach(
      node => {
        node.classList.remove('node-visited')
      }
    )

    let walls = []

    nodeContext.wallPos.forEach(w => {
      walls = [w.col, w.row, ...walls]
    })

    const gw = nodeContext.gridWidth
    const gh = nodeContext.gridHeight

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

    let pathPos = []
    result.optimumPathArray.forEach(pathNode => {
      pathPos.push({
        row: pathNode.second,
        col: pathNode.first,
        path: pathNode.path
      })
    })
    nodeContext.setPathPos(pathPos)

    let visitedPos = []
    result.visitedNodesArray.forEach(visitedNode => {
      visitedPos.push({ row: visitedNode.second, col: visitedNode.first })
    })
    nodeContext.setVisitedPos(visitedPos)

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
          height: 50,
          width: 400
        }}
        // label=''
        variant='neutral'
        className='rainbow-m-around_medium'
      >
        <FaPlay />
        &nbsp;VISUALIZE
      </Button>
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
