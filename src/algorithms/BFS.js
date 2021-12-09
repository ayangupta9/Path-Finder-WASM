import bfsHelper from './helper/bfsHelper.mjs'

export const bfs = async (
  startRow,
  startCol,
  endRow,
  endCol,
  walls,
  gridWidth,
  gridHeight
) => {
  const bfsHelperModule = await bfsHelper({
    noInitialRun: true,
    noExitRuntime: true
  })

  const vec = bfsHelperModule.returnVector()
  vec.resize(walls.length + 1, 0)
  for (let i = 0; i < walls.length; i++) {
    vec.set(i, walls[i])
  }

  let result = bfsHelperModule.solveBFS(
    vec,
    startRow,
    startCol,
    endRow,
    endCol,
    gridWidth,
    gridHeight
  )

  const pathArraySize = result.get(0)
  let optimumPathArray = []
  for (let i = 1; i < pathArraySize; i += 2) {
    optimumPathArray.push({ first: result.get(i), second: result.get(i + 1) })
  }
  optimumPathArray.reverse()

  const visitedNodesArraySize = result.get(pathArraySize + 2)
  let visitedNodesArray = []

  for (
    let i = pathArraySize + 3;
    i < pathArraySize + 2 + visitedNodesArraySize;
    i += 2
  ) {
    if (result.get(i) === startCol && result.get(i + 1) === startRow) {
      continue
    }
    if (result.get(i) === endCol && result.get(i + 1) === endRow) {
      continue
    }
    visitedNodesArray.push({
      first: result.get(i),
      second: result.get(i + 1)
    })
  }

  // optimumPathArray.forEach((node, id) => {
  //   if (id < optimumPathArray.length - 1)
  //     if (
  //       node.second + 1 === optimumPathArray.at(id + 1).second &&
  //       node.first === optimumPathArray[id + 1].first
  //     ) {
  //       node.path = 'right'
  //     } else if (
  //       node.second - 1 === optimumPathArray.at(id + 1).second &&
  //       node.first === optimumPathArray[id + 1].first
  //     ) {
  //       node.path = 'left'
  //     } else if (
  //       node.second === optimumPathArray.at(id + 1).second &&
  //       node.first + 1 === optimumPathArray[id + 1].first
  //     ) {
  //       node.path = 'down'
  //     } else if (
  //       node.second === optimumPathArray.at(id + 1).second &&
  //       node.first - 1 === optimumPathArray[id + 1].first
  //     ) {
  //       node.path = 'up'
  //     }
  // })

  return { optimumPathArray, visitedNodesArray }
}
