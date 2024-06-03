import { getManhattanDistance } from '@src/get-manhattan-distance.js'

test('getManhattanDistance', () => {
  expect(getManhattanDistance([0, 0], [0, 0])).toBe(0)
  expect(getManhattanDistance([0, 0], [0, 1])).toBe(1)
  expect(getManhattanDistance([0, 0], [0, -1])).toBe(1)
  expect(getManhattanDistance([0, 0], [1, 0])).toBe(1)
  expect(getManhattanDistance([0, 0], [-1, 0])).toBe(1)
  expect(getManhattanDistance([0, 0], [1, 1])).toBe(2)
  expect(getManhattanDistance([0, 0], [1, -1])).toBe(2)
  expect(getManhattanDistance([0, 0], [-1, 1])).toBe(2)
  expect(getManhattanDistance([0, 0], [-1, -1])).toBe(2)
})
