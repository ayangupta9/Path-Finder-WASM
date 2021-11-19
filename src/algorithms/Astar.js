import astarHelper from './helper/astarHelper.mjs'

const euclideanDistance = (coor1, coor2) => {
  const x = coor2.second - coor1.second
  const y = coor2.first - coor1.first
  return Math.sqrt(x * x + y * y)
}

export const astar = async (
  startRow,
  startCol,
  endRow,
  endCol,
  walls,
  gridWidth,
  gridHeight
) => {
  const astarHelperModule = await astarHelper({
    noInitialRun: true,
    noExitRuntime: true
  })

  const vec = astarHelperModule.returnVector()
  vec.resize(walls.length + 1, 0)
  for (let i = 0; i < walls.length; i++) {
    vec.set(i, walls[i])
  }

  let result = astarHelperModule.solveastar(
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
  for (let i = 3; i < pathArraySize; i += 2) {
    optimumPathArray.push({ first: result.get(i), second: result.get(i + 1) })
  }

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

  const startPoint = {
    first: startCol,
    second: startRow
  }
  // console.log(visitedNodesArray)
  visitedNodesArray.sort(
    (a, b) =>
      euclideanDistance(a, startPoint) - euclideanDistance(b, startPoint)
  )

  // console.log(visitedNodesArray)

  return { optimumPathArray, visitedNodesArray }
}
