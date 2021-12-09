function range (length) {
  let result = []
  for (let i = 0; i < length; i++) {
    result.push(i)
  }
  return result
}

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

function addWall (num, directionArray, startPos, finishPos) {
  let isStartFinish = false
  let tempWalls = []
  for (let temp of directionArray) {
    if (
      (num === startPos.row && temp === startPos.col) ||
      (num === finishPos.row && temp === finishPos.col)
    ) {
      isStartFinish = true
      continue
    }
    tempWalls.push([num, temp])
  }

  // console.log(tempWalls)

  if (!isStartFinish) {
    tempWalls.splice(Math.floor(Math.random() * tempWalls.length), 1)
  }

  return tempWalls
}

export function getHorizontalWalls (
  gridWidth,
  gridHeight,
  startPos,
  finishPos
) {
  let res = checkStartEnd(startPos, finishPos)
  if (res) {
    return false
  }

  const vertical = range(gridWidth)
  const horizontal = range(gridHeight)

  if (horizontal.length < 2) {
    return
  }

  let wallsFromAddWall = []
  let choice = Math.floor(Math.random() * 2)
  for (let num of horizontal) {
    if (choice === 0 && num % 2 !== 0) {
      wallsFromAddWall.push(...addWall(num, vertical, startPos, finishPos))
    }
    if (choice === 1 && num % 2 === 0) {
      wallsFromAddWall.push(...addWall(num, vertical, startPos, finishPos))
    }
  }

  let finalWalls = []

  for (let i = 0; i < wallsFromAddWall.length; i++) {
    const wallObj = {
      row: wallsFromAddWall[i][1],
      col: wallsFromAddWall[i][0]
    }
    finalWalls.push(wallObj)
  }
  return finalWalls
}
