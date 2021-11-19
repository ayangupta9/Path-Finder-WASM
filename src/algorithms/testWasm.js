const fs = require('fs')

class MemoryManager {
  memory = null

  memoryBytesLength () {
    return this.memory.buffer.byteLength
  }

  grow (blocks) {
    this.memory.grow(blocks)
    return this.memory.buffer.byteLength
  }
}

export const testWasm = async () => {
  const buf = fs.readFileSync('./wasmalgos/testWasm.wasm')

  const memoryManager = new MemoryManager()

  const res = WebAssembly.instantiate(buf, {
    env: {
      grow: function (blocks) {
        memoryManager.grow(blocks)
      },
      memoryBytesLength: function () {
        memoryManager.memoryBytesLength()
      }
    }
  })

  const { memory, allocateMemory, freeMemory, reportFreeMemory } = (
    await res
  ).instance.exports

  memoryManager.memory = memory

  const startFreeMemoryBytes = reportFreeMemory()
  console.log(`There are ${startFreeMemoryBytes} bytes of free memory `)

  const { addArrays } = (await res).instance.exports

  const length = 5
  const bytesLength = length * Int32Array.BYTES_PER_ELEMENT
  const array1 = new Int32Array(
    memory.buffer,
    allocateMemory(bytesLength),
    length
  )
  array1.set([1, 2, 3, 4, 5])

  const array2 = new Int32Array(
    memory.buffer,
    allocateMemory(bytesLength),
    length
  )
  array2.set([6, 7, 8, 9, 10])

  let result = new Int32Array(
    memory.buffer,
    addArrays(array1.byteOffset, array2.byteOffset, length)
  )

  console.log(result)

  let pctFree = (100 * reportFreeMemory()) / startFreeMemoryBytes
  console.log(pctFree)

  freeMemory(array1.byteOffset)
  freeMemory(array2.byteOffset)
  freeMemory(result.byteOffset)

  pctFree = (100 * reportFreeMemory()) / startFreeMemoryBytes
  console.log(pctFree)

  //   const response = await fetch('./wasmalgos/solvedijkstra2.wasm')
  //   const buffer = await response.arrayBuffer()
}
