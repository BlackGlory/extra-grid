import { Direction, reverseDirection } from '@src/direction.js'

describe('reverseDirection', () => {
  test('Up', () => {
    const direction = Direction.Up

    const result = reverseDirection(direction)

    expect(result).toBe(Direction.Down)
  })

  test('Down', () => {
    const direction = Direction.Down

    const result = reverseDirection(direction)

    expect(result).toBe(Direction.Up)
  })

  test('Left', () => {
    const direction = Direction.Left

    const result = reverseDirection(direction)

    expect(result).toBe(Direction.Right)
  })

  test('Right', () => {
    const direction = Direction.Right

    const result = reverseDirection(direction)

    expect(result).toBe(Direction.Left)
  })

  test('UpLeft', () => {
    const direction = Direction.UpLeft

    const result = reverseDirection(direction)

    expect(result).toBe(Direction.DownRight)
  })

  test('UpRight', () => {
    const direction = Direction.UpRight

    const result = reverseDirection(direction)

    expect(result).toBe(Direction.DownLeft)
  })

  test('DownLeft', () => {
    const direction = Direction.DownLeft

    const result = reverseDirection(direction)

    expect(result).toBe(Direction.UpRight)
  })

  test('DownRight', () => {
    const direction = Direction.DownRight

    const result = reverseDirection(direction)

    expect(result).toBe(Direction.UpLeft)
  })
})
