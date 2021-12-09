import dijkstraHelper from './helper/dijkstraHelper.mjs'

const euclideanDistance = (coor1, coor2) => {
  const x = coor2.second - coor1.second
  const y = coor2.first - coor1.first
  return Math.sqrt(x * x + y * y)
}

export const dijkstra = async (
  startRow,
  startCol,
  endRow,
  endCol,
  walls,
  gridWidth,
  gridHeight
) => {
  // let asmLibraryArg = {
  //   __cxa_allocate_exception: () => {},
  //   __cxa_throw: () => {},
  //   _embind_register_bigint: () => {},
  //   _embind_register_bool: () => {},
  //   _embind_register_class: () => {},
  //   _embind_register_class_constructor: () => {},
  //   _embind_register_class_function: () => {},
  //   _embind_register_emval: () => {},
  //   _embind_register_float: () => {},
  //   _embind_register_function: () => {},
  //   _embind_register_integer: () => {},
  //   _embind_register_memory_view: () => {},
  //   _embind_register_std_string: () => {},
  //   _embind_register_std_wstring: () => {},
  //   _embind_register_void: () => {},
  //   _emval_decref: () => {},
  //   _emval_incref: () => {},
  //   _emval_take_value: () => {},
  //   abort: () => {},
  //   emscripten_memcpy_big: () => {},
  //   emscripten_resize_heap: () => {},
  //   proc_exit: () => {}
  // }

  // let info = {
  //   env: asmLibraryArg,
  //   wasi_snapshot_preview1: asmLibraryArg
  // }

  const dijkstraHelperModule = await dijkstraHelper({
    noInitialRun: true,
    noExitRuntime: true
  })

  const vec = dijkstraHelperModule.returnVector()
  vec.resize(walls.length + 1, 0)
  for (let i = 0; i < walls.length; i++) {
    vec.set(i, walls[i])
  }

  let result = dijkstraHelperModule.solveDijkstra(
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

  // console.log(visitedNodesArray)

  const startPoint = {
    first: startCol,
    second: startRow
  }
  console.log(visitedNodesArray)
  visitedNodesArray.sort(
    (a, b) =>
      euclideanDistance(a, startPoint) - euclideanDistance(b, startPoint)
  )

  // visitedNodesArray.forEach((node, id) => {
  //   if (
  //     node.first === visitedNodesArray[id + 1].first - 1 &&
  //     node.second === visitedNodesArray[id + 1].second
  //   ) {
  //     node.sign = 'right'
  //   } else if (
  //     node.first === visitedNodesArray[id + 1].first + 1 &&
  //     node.second === visitedNodesArray[id + 1].second
  //   ) {
  //     node.sign = 'left'
  //   } else if (
  //     node.first === visitedNodesArray[id + 1].first &&
  //     node.second === visitedNodesArray[id + 1].second - 1
  //   ) {
  //     node.sign = 'down'
  //   } else if (
  //     node.first === visitedNodesArray[id + 1].first &&
  //     node.second === visitedNodesArray[id + 1].second + 1
  //   ) {
  //     node.sign = 'up'
  //   }
  // })

  return { optimumPathArray, visitedNodesArray }
}

// let wallsJSArray = new Int32Array(
//   dijkstraHelperModule.HEAP32.buffer,
//   0,
//   walls.length
// )

// wallsJSArray.set(walls)
// const wallsLength = walls.length

// console.log(wallsJSArray)
// const value = dijkstraHelperModule.solveDijkstra(
//   wallsJSArray,
//   wallsLength,
//   startRow,
//   startCol,
//   endRow,
//   endCol,
//   gridWidth,
//   gridHeight
// )

// console.log(value)
// console.log(
//   dijkstraHelperModule.solveDijkstra(
//     wallsJSArray,
//     wallsLength,
//     startRow,
//     startCol,
//     endRow,
//     endCol,
//     gridWidth,
//     gridHeight
//   )
// )

// console.log(dijkstraHelperModule.returnData().get(0))
// console.log(dijkstraHelperModule.returnData().get(1))
// console.log(dijkstraHelperModule.returnData().get(2))
// console.log(dijkstraHelperModule.returnData().get(3))
// console.log(dijkstraHelperModule.returnData().get(4))
// const response = await fetch('./wasmalgos/solvedijkstra2.wasm')
// const buffer = await response.arrayBuffer()
// const wasm = await WebAssembly.instantiate(buffer, info)
// const module = wasm.instance.exports
// const { returnData, memory } = module

// console.log(wasm)

// offset = wallsLength * Int32Array.BYTES_PER_ELEMENT
// const length = gridWidth * gridHeight * 10
// let result = new Int32Array(
//   memory.buffer,
//   550 * Int32Array.BYTES_PER_ELEMENT,
//   length
// )

// memory.grow(2)

// let value = await returnData()
// 6
// wallsJSArray,
// wallsLength,
// // result,
// startRow,
// startCol,
// endRow,
// endCol,
// gridWidth,
// gridHeight
// )

// let optimumPath = []
// const pathSize = result[0]
// console.log(result[0], result[4])
// if (result[4] === -1) {
//   optimumPath = []
// } else {
//   for (let i = 4; i < pathSize; i += 2) {
//     // if (result[i] === -1) {
//     // break
//     // } else {
//     optimumPath.push({ first: result[i], second: result[i + 1] })
//     // }
//   }
// }

// console.log(value)
// console.log(result.size())

// let visitedNodesPath = []
// for (let i = 1; i < visitedNodes.length; i++) {
//   if (visitedNodes[i] === -1) {
//     break
//   } else {
//     visitedNodesPath.push({
//       first: visitedNodes[i],
//       second: visitedNodes[i + 1]
//     })
//   }
// }

// console.log(result.toString())
// console.log(visitedNodes.toString())

// wallsJSArray = null
// result = null
