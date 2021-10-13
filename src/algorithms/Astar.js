export const astar = async (
  startRow,
  startCol,
  endRow,
  endCol,
  walls,
  gridWidth,
  gridHeight
) => {
  let asmLibraryArg = {
    __cxa_allocate_exception: () => {},
    __cxa_throw: () => {},
    abort: () => {},
    emscripten_memcpy_big: () => {},
    emscripten_resize_heap: () => {},
    fd_write: () => {},
    setTempRet0: () => {}
  }

  let info = {
    env: asmLibraryArg,
    wasi_snapshot_preview1: asmLibraryArg
  }

  let offset = 0
  const response = await fetch('./wasmalgos/solveastar.wasm')
  const buffer = await response.arrayBuffer()
  const wasm = await WebAssembly.instantiate(buffer, info)
  const module = wasm.instance.exports
  const { solveastar, memory } = module

  console.log(module)

  let wallsJSArray = new Int32Array(memory.buffer, offset, walls.length)
  wallsJSArray.set(walls)
  const wallsLength = walls.length

  let result = new Int32Array(memory.buffer, 0, gridWidth * gridHeight * 2)

  solveastar(
    wallsJSArray,
    wallsLength,
    result,
    startRow,
    startCol,
    endRow,
    endCol,
    gridWidth,
    gridHeight
  )

  let optimumPath = []
  for (let i = 3; i < result.length; i += 2) {
    if (result[i] === -1) {
      break
    } else {
      optimumPath.push({ first: result[i], second: result[i + 1] })
    }
  }
  // console.log(result)
  // console.log(optimumPath)
  wallsJSArray = null
  result = null

  return optimumPath
}
