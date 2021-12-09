let walls
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

function generateOddRandomNumber (arrayLength) {
  let randomNumber =
    Math.floor(Math.random() * (arrayLength / 2)) +
    Math.floor(Math.random() * (arrayLength / 2))

  if (randomNumber % 2 === 0) {
    if (randomNumber === arrayLength) {
      randomNumber -= 1
    } else {
      randomNumber += 1
    }
  }

  return randomNumber
}

function generateRandomNumber (max) {
  let randomNumber =
    Math.floor(Math.random() * (max / 2)) +
    Math.floor(Math.random() * (max / 2))

  if (randomNumber % 2 !== 0) {
    if (randomNumber === max) {
      randomNumber -= 1
    } else {
      randomNumber += 1
    }
  }

  return randomNumber
}

function addRecursiveWall (
  dir,
  num,
  vertical,
  horizontal,
  startPos,
  finishPos
) {
  let isStartFinish = false
  let tempWalls = []

  if (dir === 0) {
    if (horizontal.length === 2) return
    for (const temp of horizontal) {
      if (
        (temp === startPos.row && num === startPos.col) ||
        (temp === finishPos.row && num === finishPos.col)
      ) {
        isStartFinish = true
        continue
      }
      tempWalls.push([temp, num])
    }
  } else {
    if (vertical.length === 2) return
    for (const temp of vertical) {
      if (
        (num === startPos.row && temp === startPos.col) ||
        (num === finishPos.row && temp === finishPos.col)
      ) {
        isStartFinish = true
        continue
      }
      tempWalls.push([num, temp])
    }
  }

  if (!isStartFinish) {
    tempWalls.splice(generateRandomNumber(tempWalls.length), 1)
  }

  for (const wall of tempWalls) {
    walls.push(wall)
  }
}

function getRecursiveWalls (
  vertical,
  horizontal,
  gridWidth,
  gridHeight,
  startPos,
  finishPos
) {
  if (vertical.length < 2 || horizontal.length < 2) {
    return
  }

  let dir
  let num

  if (vertical.length > horizontal.length) {
    dir = 0
    num = vertical[generateOddRandomNumber(vertical.length - 1)]
  } else {
    dir = 1
    num = horizontal[generateOddRandomNumber(horizontal.length - 1)]
  }

  if (dir === 0) {
    addRecursiveWall(dir, num, vertical, horizontal, startPos, finishPos)
    getRecursiveWalls(
      vertical.slice(0, vertical.indexOf(num)),
      horizontal,
      gridWidth,
      gridHeight,
      startPos,
      finishPos
    )

    getRecursiveWalls(
      vertical.slice(vertical.indexOf(num) + 1),
      horizontal,
      gridWidth,
      gridHeight,
      startPos,
      finishPos
    )
  } else {
    addRecursiveWall(dir, num, vertical, horizontal, startPos, finishPos)
    getRecursiveWalls(
      vertical,
      horizontal.slice(0, horizontal.indexOf(num)),
      gridWidth,
      gridHeight,
      startPos,
      finishPos
    )

    getRecursiveWalls(
      vertical,
      horizontal.slice(horizontal.indexOf(num) + 1),
      gridWidth,
      gridHeight,
      startPos,
      finishPos
    )
  }
}

export function recursiveDivisionMaze (
  gridWidth,
  gridHeight,
  startPos,
  finishPos
) {
  const res = checkStartEnd(startPos, finishPos)
  if (res) {
    return false
  }

  let vertical = range(gridWidth)
  let horizontal = range(gridHeight)

  walls = []

  getRecursiveWalls(
    vertical,
    horizontal,
    gridWidth,
    gridHeight,
    startPos,
    finishPos
  )

  let finalWalls = []

  for (let i = 0; i < walls.length; i++) {
    const wallObj = {
      row: walls[i][1],
      col: walls[i][0]
    }
    finalWalls.push(wallObj)
  }

  return finalWalls
}
