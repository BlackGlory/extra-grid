import { isVonNeumannNeighborOf, isMooreNeighborOf } from '@src/is-neighbor-of.js'

describe('isVonNeumannNeighborOf', () => {
  test.each<[[x: number, y: number], [x: number, y: number], number, boolean]>([
    [[0, 0], [0, 0], 1, false]
  , [[0, 1], [0, 0], 1, true]
  , [[1, 0], [0, 0], 1, true]
  , [[0, -1], [0, 0], 1, true]
  , [[-1, 0], [0, 0], 1, true]
  , [[1, 1], [0, 0], 1, false]
  , [[1, -1], [0, 0], 1, false]
  , [[-1, 1], [0, 0], 1, false]
  , [[-1, -1], [0, 0], 1, false]
  , [[0, 2], [0, 0], 1, false]
  , [[0, -2], [0, 0], 1, false]
  , [[2, 0], [0, 0], 1, false]
  , [[-2, 0], [0, 0], 1, false]
  ])('(%s, %s, %s)', (subject, object, range, expected) => {
    const result = isVonNeumannNeighborOf(subject, object, range)

    expect(result).toBe(expected)
  })
})

describe('isMooreNeighborOf', () => {
  test.each<[[x: number, y: number], [x: number, y: number], number, boolean]>([
    [[0, 0], [0, 0], 1, false]
  , [[0, 1], [0, 0], 1, true]
  , [[1, 0], [0, 0], 1, true]
  , [[0, -1], [0, 0], 1, true]
  , [[-1, 0], [0, 0], 1, true]
  , [[1, 1], [0, 0], 1, true]
  , [[1, -1], [0, 0], 1, true]
  , [[-1, 1], [0, 0], 1, true]
  , [[-1, -1], [0, 0], 1, true]
  , [[0, 2], [0, 0], 1, false]
  , [[0, -2], [0, 0], 1, false]
  , [[2, 0], [0, 0], 1, false]
  , [[-2, 0], [0, 0], 1, false]
  ])('(%s, %s, %s)', (subject, object, range, expected) => {
    const result = isMooreNeighborOf(subject, object, range)

    expect(result).toBe(expected)
  })
})
