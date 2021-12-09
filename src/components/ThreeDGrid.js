import React, { useEffect, useState } from 'react'
import ThreeDNode from './ThreeDNode'

const ThreeDGrid = props => {
  const [list, setList] = useState([])

  const gw = props.gridWidth / 4
  const gh = props.gridHeight / 4

  useEffect(() => {
    // const a = [
    //   -10.0,
    //   -9.5,
    //   -9.0,
    //   -8.5,
    //   -8.0,
    //   -7.5,
    //   -7.0,
    //   -6.5,
    //   -6.0,
    //   -5.5,
    //   -5.0,
    //   -4.5,
    //   -4.0,
    //   -3.5,
    //   -3.0,
    //   -2.5,
    //   -2.0,
    //   -1.5,
    //   -1.0,
    //   -0.5,
    //   0,
    //   0.5,
    //   1.0,
    //   1.5,
    //   2.0,
    //   2.5,
    //   3.0,
    //   3.5,
    //   4.0,
    //   4.5,
    //   5.0,
    //   5.5,
    //   6.0,
    //   6.5,
    //   7.0,
    //   7.5,
    //   8.0,
    //   8.5,
    //   9.0,
    //   9.5
    //   // 10.0
    // ]

    let a = []
    for (let i = -gw; i < gw; i += 0.5) {
      a.push(i)
    }

    let newList = []
    for (let i = -gh; i < gh; i += 0.5) {
      newList.push({
        row: i,
        items: a
      })
    }
    setList(newList)
  }, [])

  return (
    <>
      {/* <Box castShadow={true} position={[5, 5, 5]} args={[5, 5, 5]}>
        <meshPhongMaterial attach='material' color='#000000' wireframe />
      </Box> */}

      {/* <Html
        position={[13, 0, 0]}
        style={{
          width: '300px',
          position: 'absolute'
        }}
      >
        <OpacitySlider
          wallOpacity={wallOpacity}
          setWallOpacity={setWallOpacity}
        />
      </Html> */}

      <group position={props.position}>
        {list.length !== 0
          ? list.map((itemsList, id1) => {
              return (
                <group
                  rotation={[0, Math.PI, 0]}
                  key={id1}
                  position={[-0.25, 0.25, 0]}
                >
                  {itemsList.items.map((item, id2) => {
                    let isWall = false
                    if (
                      props.wallPos.some(
                        wall => wall.row === id2 && wall.col === id1
                      )
                    ) {
                      isWall = true
                    }

                    let color = 0xffffff
                    let sign = ''
                    if (
                      props.startPos.row === id2 &&
                      props.startPos.col === id1
                    ) {
                      color = 0x008000
                    } else if (
                      props.finishPos.row === id2 &&
                      props.finishPos.col === id1
                    ) {
                      color = 0xff0000
                    }

                    if (
                      props.visitedPos.some(
                        node => node.row === id2 && node.col === id1
                      )
                    ) {
                      color = 0x4bb6e6
                    }
                    {
                      /* FFEB47 */
                    }
                    if (
                      props.pathPos.some(
                        node => node.row === id2 && node.col === id1
                      )
                    ) {
                      color = 0xffff00
                      const value = props.pathPos.filter(pos => {
                        return pos.row === id2 && pos.col === id1
                      })[0]
                      sign = props.pathPos.length - props.pathPos.indexOf(value)
                    }

                    return (
                      <ThreeDNode
                        setInitCameraPos={props.setInitCameraPos}
                        firstPerson={props.firstPerson}
                        sign={sign}
                        isWall={isWall}
                        nodeColor={color}
                        key={'' + id2 + id1}
                        position={[item, itemsList.row, 0]}
                      />
                    )
                  })}
                </group>
              )
            })
          : ''}

        <mesh position={[0, 0, -0.01]}>
          <planeBufferGeometry args={[gw * 2 + 0.03, gh * 2 + 0.02]} />
          <meshBasicMaterial color={0x666666} />
        </mesh>
        {/* {grid.map((node, nodeId) => {
          return <ThreeDNode key={nodeId} isWall={true} nodeColor={'#ffffff'} />
        })} */}
      </group>
    </>
  )
}

export default ThreeDGrid
