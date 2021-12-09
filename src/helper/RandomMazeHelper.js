function checkStartEnd (startPos, finishPos) {
  if (
    (startPos.row === -1 && startPos.col === -1) ||
    (finishPos.row === -1 && finishPos.col === -1) ||
    startPos === finishPos
  ) {
    return true
  }
  return false
}

export function getRandomWalls (gridWidth, gridHeight, startPos, finishPos) {
  const res = checkStartEnd(startPos, finishPos)
  if (res) {
    return false
  }

  let tempWalls = []
  for (let row = 0; row < gridHeight; row++) {
    for (let col = 0; col < gridWidth; col++) {
      if (
        (row === startPos.row && col === startPos.col) ||
        (row === finishPos.row && col === finishPos.col)
      ) {
        continue
      }

      if (Math.random() < 0.33) {
        tempWalls.push([row, col])
      }
    }
  }

  tempWalls.sort(() => Math.random() - 0.5)

  let finalWalls = []

  for (let i = 0; i < tempWalls.length; i++) {
    const wallObj = {
      row: tempWalls[i][1],
      col: tempWalls[i][0]
    }
    finalWalls.push(wallObj)
  }

  return finalWalls
}
