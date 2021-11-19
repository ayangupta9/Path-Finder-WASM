import bestfsHelper from './helper/bestfsHelper.mjs'

export const bestfs = async (
  startRow,
  startCol,
  endRow,
  endCol,
  walls,
  gridWidth,
  gridHeight
) => {
  const bestfsHelperModule = await bestfsHelper({
    noInitialRun: true,
    noExitRuntime: true
  })

  const vec = bestfsHelperModule.returnVector()
  vec.resize(walls.length + 1, 0)
  for (let i = 0; i < walls.length; i++) {
    vec.set(i, walls[i])
  }

  let result = bestfsHelperModule.solveBestFS(
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

  return { optimumPathArray, visitedNodesArray }
}
