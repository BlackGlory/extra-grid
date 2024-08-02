import { Direction } from '@src/direction.js'
import { getNewCoordinate } from '@src/get-new-coordinate.js'

type Position = [x: number, y: number]

describe('getNewCoordinate', () => {
  test.each<[Position, Direction, number, Position]>([
    [[0, 0], Direction.Up, 1, [0, -1]]
  , [[0, 0], Direction.Up, -1, [0, 1]]
  , [[0, 0], Direction.Up, 2, [0, -2]]
  , [[0, 0], Direction.Down, 1, [0, 1]]
  , [[0, 0], Direction.Down, -1, [0, -1]]
  , [[0, 0], Direction.Down, 2, [0, 2]]
  , [[0, 0], Direction.Left, 1, [-1, 0]]
  , [[0, 0], Direction.Left, -1, [1, 0]]
  , [[0, 0], Direction.Left, 2, [-2, 0]]
  , [[0, 0], Direction.Right, 1, [1, 0]]
  , [[0, 0], Direction.Right, -1, [-1, 0]]
  , [[0, 0], Direction.Right, 2, [2, 0]]
  , [[0, 0], Direction.UpLeft, 1, [-1, -1]]
  , [[0, 0], Direction.UpLeft, -1, [1, 1]]
  , [[0, 0], Direction.UpLeft, 2, [-2, -2]]
  , [[0, 0], Direction.UpRight, 1, [1, -1]]
  , [[0, 0], Direction.UpRight, -1, [-1, 1]]
  , [[0, 0], Direction.UpRight, 2, [2, -2]]
  , [[0, 0], Direction.DownLeft, 1, [-1, 1]]
  , [[0, 0], Direction.DownLeft, -1, [1, -1]]
  , [[0, 0], Direction.DownLeft, 2, [-2, 2]]
  , [[0, 0], Direction.DownRight, 1, [1, 1]]
  , [[0, 0], Direction.DownRight, -1, [-1, -1]]
  , [[0, 0], Direction.DownRight, 2, [2, 2]]
  ])('(%s, %s, %s) => %s', (coordinate, direction, distance, newCoordinate) => {
    const result = getNewCoordinate(...coordinate, direction, distance)

    expect(result).toStrictEqual(newCoordinate)
  })
})
