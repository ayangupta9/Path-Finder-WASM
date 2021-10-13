export const dfs = async (
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
    emscripten_resize_heap: () => {}
  }

  let info = {
    env: asmLibraryArg,
    wasi_snapshot_preview1: asmLibraryArg
  }

  let offset = 0

  const response = await fetch('./wasmalgos/solvedfs.wasm')
  const buffer = await response.arrayBuffer()
  const wasm = await WebAssembly.instantiate(buffer, info)
  const module = wasm.instance.exports
  const { solveDFS, memory } = module

  const wallsLength = walls.length
  let wallsJSArray = new Int32Array(memory.buffer, offset, wallsLength)
  wallsJSArray.set(walls)

  let result = new Int32Array(memory.buffer, 0, gridWidth * gridHeight * 2)

  solveDFS(
    walls,
    wallsLength,
    result,
    startRow,
    startCol,
    endRow,
    endCol,
    gridWidth,
    gridHeight
  )

  console.log(result)

  let optimumPath = []
  for (let i = 1; i < result.length; i += 2) {
    if (result[i] === -1) {
      break
    } else {
      optimumPath.push({ first: result[i], second: result[i + 1] })
    }
  }

  // console.log(optimumPath)

  wallsJSArray = null
  result = null

  return optimumPath
}
