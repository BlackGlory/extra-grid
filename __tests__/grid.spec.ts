import { Grid } from '@src/grid.js'
import { Direction } from '@src/direction.js'
import { jest } from '@jest/globals'
import { getError } from 'return-style'
import { toArray } from '@blackglory/prelude'

describe('Grid', () => {
  test('constructor', () => {
    const width = 2
    const height = 2
    const createCell = jest.fn((x: number, y: number) => [x, y])

    const grid = new Grid(width, height, createCell)

    expect(createCell).toBeCalledTimes(width * height)
    expect(grid.get(0, 0)).toStrictEqual([0, 0])
    expect(grid.get(0, 1)).toStrictEqual([0, 1])
    expect(grid.get(1, 0)).toStrictEqual([1, 0])
    expect(grid.get(1, 1)).toStrictEqual([1, 1])
  })

  test('width, height', () => {
    const width = 2
    const height = 3

    const grid = new Grid(width, height, () => null)

    expect(grid.width).toBe(width)
    expect(grid.height).toBe(height)
  })

  describe('set', () => {
    test('generic', () => {
      const width = 2
      const height = 1
      const grid = new Grid(width, height, () => 0)

      grid.set(0, 0, 1)

      expect(grid.get(0, 0)).toBe(1)
      expect(grid.get(1, 0)).toBe(0)
    })

    test('out of bounds', () => {
      const width = 1
      const height = 1
      const grid = new Grid(width, height, () => 0)

      const err = getError(() => grid.set(0, 1, 0))

      expect(err?.message).toBe('Out of bounds')
    })
  })

  describe('get', () => {
    test('generic', () => {
      const width = 1
      const height = 1
      const grid = new Grid(width, height, () => 0)

      const result = grid.get(0, 0)

      expect(result).toBe(0)
    })

    test('out of bounds', () => {
      const width = 1
      const height = 1
      const grid = new Grid(width, height, () => 0)

      const err = getError(() => grid.get(1, 0))

      expect(err?.message).toBe('Out of bounds')
    })
  })

  describe('tryGet', () => {
    test('generic', () => {
      const width = 1
      const height = 1
      const grid = new Grid(width, height, () => 0)

      const result = grid.tryGet(0, 0)

      expect(result).toBe(0)
    })

    test('out of bounds', () => {
      const width = 1
      const height = 1
      const grid = new Grid(width, height, () => 0)

      const result = grid.tryGet(1, 0)

      expect(result).toBe(null)
    })
  })

  describe('getNewCoordinate', () => {
    describe('Up', () => {
      test('distance = 1', () => {
        const width = 3
        const height = 3
        const grid = new Grid(width, height, () => null)

        const result = grid.getNewCoordinate(1, 1, Direction.Up, 1)

        expect(result).toStrictEqual({ x: 1, y: 0 })
      })

      test('distance = 2', () => {
        const width = 5
        const height = 5
        const grid = new Grid(width, height, () => null)

        const result = grid.getNewCoordinate(2, 2, Direction.Up, 2)

        expect(result).toStrictEqual({ x: 2, y: 0 })
      })
    })

    describe('Down', () => {
      test('distance = 1', () => {
        const width = 3
        const height = 3
        const grid = new Grid(width, height, () => null)

        const result = grid.getNewCoordinate(1, 1, Direction.Down, 1)

        expect(result).toStrictEqual({ x: 1, y: 2 })
      })

      test('distance = 2', () => {
        const width = 5
        const height = 5
        const grid = new Grid(width, height, () => null)

        const result = grid.getNewCoordinate(2, 2, Direction.Down, 2)

        expect(result).toStrictEqual({ x: 2, y: 4 })
      })
    })

    describe('Left', () => {
      test('distance = 1', () => {
        const width = 3
        const height = 3
        const grid = new Grid(width, height, () => null)

        const result = grid.getNewCoordinate(1, 1, Direction.Left, 1)

        expect(result).toStrictEqual({ x: 0, y: 1 })
      })

      test('distance = 2', () => {
        const width = 5
        const height = 5
        const grid = new Grid(width, height, () => null)

        const result = grid.getNewCoordinate(2, 2, Direction.Left, 2)

        expect(result).toStrictEqual({ x: 0, y: 2 })
      })
    })

    describe('Right', () => {
      test('distance = 1', () => {
        const width = 3
        const height = 3
        const grid = new Grid(width, height, () => null)

        const result = grid.getNewCoordinate(1, 1, Direction.Right, 1)

        expect(result).toStrictEqual({ x: 2, y: 1 })
      })

      test('distance = 2', () => {
        const width = 5
        const height = 5
        const grid = new Grid(width, height, () => null)

        const result = grid.getNewCoordinate(2, 2, Direction.Right, 2)

        expect(result).toStrictEqual({ x: 4, y: 2 })
      })
    })

    describe('UpLeft', () => {
      test('distance = 1', () => {
        const width = 3
        const height = 3
        const grid = new Grid(width, height, () => null)

        const result = grid.getNewCoordinate(1, 1, Direction.UpLeft, 1)

        expect(result).toStrictEqual({ x: 0, y: 0 })
      })

      test('distance = 2', () => {
        const width = 5
        const height = 5
        const grid = new Grid(width, height, () => null)

        const result = grid.getNewCoordinate(2, 2, Direction.UpLeft, 2)

        expect(result).toStrictEqual({ x: 0, y: 0 })
      })
    })

    describe('UpRight', () => {
      test('distance = 1', () => {
        const width = 3
        const height = 3
        const grid = new Grid(width, height, () => null)

        const result = grid.getNewCoordinate(1, 1, Direction.UpRight, 1)

        expect(result).toStrictEqual({ x: 2, y: 0 })
      })

      test('distance = 2', () => {
        const width = 5
        const height = 5
        const grid = new Grid(width, height, () => null)

        const result = grid.getNewCoordinate(2, 2, Direction.UpRight, 2)

        expect(result).toStrictEqual({ x: 4, y: 0 })
      })
    })

    describe('DownLeft', () => {
      test('distance = 1', () => {
        const width = 3
        const height = 3
        const grid = new Grid(width, height, () => null)

        const result = grid.getNewCoordinate(1, 1, Direction.DownLeft, 1)

        expect(result).toStrictEqual({ x: 0, y: 2 })
      })

      test('distance = 2', () => {
        const width = 5
        const height = 5
        const grid = new Grid(width, height, () => null)

        const result = grid.getNewCoordinate(2, 2, Direction.DownLeft, 2)

        expect(result).toStrictEqual({ x: 0, y: 4 })
      })
    })

    describe('DownRight', () => {
      test('distance = 1', () => {
        const width = 3
        const height = 3
        const grid = new Grid(width, height, () => null)

        const result = grid.getNewCoordinate(1, 1, Direction.DownRight, 1)

        expect(result).toStrictEqual({ x: 2, y: 2 })
      })

      test('distance = 2', () => {
        const width = 5
        const height = 5
        const grid = new Grid(width, height, () => null)

        const result = grid.getNewCoordinate(2, 2, Direction.DownRight, 2)

        expect(result).toStrictEqual({ x: 4, y: 4 })
      })
    })

    test('out of bounds', () => {
      const width = 1
      const height = 1
      const grid = new Grid(width, height, () => null)

      const result = grid.getNewCoordinate(0, 0, Direction.Up, 1)

      expect(result).toBe(null)
    })
  })

  test('coordinates', () => {
    const width = 2
    const height = 2
    const grid = new Grid(width, height, () => null)

    const iter = grid.coordinates()
    const result = toArray(iter)

    expect(result).toStrictEqual(toArray(grid.coordinatesRowMajor()))
  })

  test('coordinatesRowMajor', () => {
    const width = 2
    const height = 2
    const grid = new Grid(width, height, () => null)

    const iter = grid.coordinatesRowMajor()
    const result = toArray(iter)

    expect(result).toStrictEqual([
      [0, 0]
    , [1, 0]
    , [0, 1]
    , [1, 1]
    ])
  })

  test('coordinatesColumnMajor', () => {
    const width = 2
    const height = 2
    const grid = new Grid(width, height, () => null)

    const iter = grid.coordinatesColumnMajor()
    const result = toArray(iter)

    expect(result).toStrictEqual([
      [0, 0]
    , [0, 1]
    , [1, 0]
    , [1, 1]
    ])
  })

  test('vonNeumannNeighborhoodCoordinates', () => {
    const width = 3
    const height = 3
    const grid = new Grid(width, height, () => null)

    const iter = grid.vonNeumannNeighborhoodCoordinates(1, 1, 1)
    const result = toArray(iter)

    expect(result).toStrictEqual(toArray(grid.vonNeumannNeighborhoodCoordinatesRowMajor(1, 1, 1)))
  })

  describe('vonNeumanNeighborhoodCoordinatesRowMajor', () => {
    test('range = 1', () => {
      const width = 3
      const height = 3
      const grid = new Grid(width, height, () => null)

      const iter = grid.vonNeumannNeighborhoodCoordinatesRowMajor(1, 1, 1)
      const result = toArray(iter)

      expect(result).toStrictEqual([
        [1, 0]
      , [0, 1]
      , [2, 1]
      , [1, 2]
      ])
    })

    test('range = 2', () => {
      const width = 5
      const height = 5
      const grid = new Grid(width, height, () => null)

      const iter = grid.vonNeumannNeighborhoodCoordinatesRowMajor(2, 2, 2)
      const result = toArray(iter)

      expect(result).toStrictEqual([
        [2, 0]
      , [1, 1]
      , [2, 1]
      , [3, 1]
      , [0, 2]
      , [1, 2]
      , [3, 2]
      , [4, 2]
      , [1, 3]
      , [2, 3]
      , [3, 3]
      , [2, 4]
      ])
    })

    test('edge: 1x1 grid', () => {
      const width = 1
      const height = 1
      const grid = new Grid(width, height, () => null)

      const iter = grid.mooreNeighborhoodCoordinatesRowMajor(0, 0, 1)
      const result = toArray(iter)

      expect(result).toStrictEqual([])
    })

    test('edge: 2x2 gird', () => {
      const width = 2
      const height = 2
      const grid = new Grid(width, height, () => null)

      const iter = grid.mooreNeighborhoodCoordinatesRowMajor(0, 0, 1)
      const result = toArray(iter)

      expect(result).toStrictEqual([
        [1, 0]
      , [0, 1]
      , [1, 1]
      ])
    })
  })

  describe('vonNeumanNeighborhoodCoordinatesColumnMajor', () => {
    test('range = 1', () => {
      const width = 3
      const height = 3
      const grid = new Grid(width, height, () => null)

      const iter = grid.vonNeumannNeighborhoodCoordinatesColumnMajor(1, 1, 1)
      const result = toArray(iter)

      expect(result).toStrictEqual([
        [0, 1]
      , [1, 0]
      , [1, 2]
      , [2, 1]
      ])
    })

    test('range = 2', () => {
      const width = 5
      const height = 5
      const grid = new Grid(width, height, () => null)

      const iter = grid.vonNeumannNeighborhoodCoordinatesColumnMajor(2, 2, 2)
      const result = toArray(iter)

      expect(result).toStrictEqual([
        [0, 2]
      , [1, 1]
      , [1, 2]
      , [1, 3]
      , [2, 0]
      , [2, 1]
      , [2, 3]
      , [2, 4]
      , [3, 1]
      , [3, 2]
      , [3, 3]
      , [4, 2]
      ])
    })

    test('edge: 1x1 grid', () => {
      const width = 1
      const height = 1
      const grid = new Grid(width, height, () => null)

      const iter = grid.mooreNeighborhoodCoordinatesColumnMajor(0, 0, 1)
      const result = toArray(iter)

      expect(result).toStrictEqual([])
    })

    test('edge: 2x2 gird', () => {
      const width = 2
      const height = 2
      const grid = new Grid(width, height, () => null)

      const iter = grid.mooreNeighborhoodCoordinatesColumnMajor(0, 0, 1)
      const result = toArray(iter)

      expect(result).toStrictEqual([
        [0, 1]
      , [1, 0]
      , [1, 1]
      ])
    })
  })

  test('mooreNeighborhoodCoordinates', () => {
    const width = 3
    const height = 3
    const grid = new Grid(width, height, () => null)

    const iter = grid.mooreNeighborhoodCoordinates(1, 1, 1)
    const result = toArray(iter)

    expect(result).toStrictEqual(toArray(grid.mooreNeighborhoodCoordinatesRowMajor(1, 1, 1)))
  })

  describe('mooreNeighborhoodCoordinatesRowMajor', () => {
    test('range = 1', () => {
      const width = 3
      const height = 3
      const grid = new Grid(width, height, () => null)

      const iter = grid.mooreNeighborhoodCoordinatesRowMajor(1, 1, 1)
      const result = toArray(iter)

      expect(result).toStrictEqual([
        [0, 0]
      , [1, 0]
      , [2, 0]
      , [0, 1]
      , [2, 1]
      , [0, 2]
      , [1, 2]
      , [2, 2]
      ])
    })

    test('range = 2', () => {
      const width = 5
      const height = 5
      const grid = new Grid(width, height, () => null)

      const iter = grid.mooreNeighborhoodCoordinatesRowMajor(2, 2, 2)
      const result = toArray(iter)

      expect(result).toStrictEqual([
        [0, 0]
      , [1, 0]
      , [2, 0]
      , [3, 0]
      , [4, 0]
      , [0, 1]
      , [1, 1]
      , [2, 1]
      , [3, 1]
      , [4, 1]
      , [0, 2]
      , [1, 2]
      , [3, 2]
      , [4, 2]
      , [0, 3]
      , [1, 3]
      , [2, 3]
      , [3, 3]
      , [4, 3]
      , [0, 4]
      , [1, 4]
      , [2, 4]
      , [3, 4]
      , [4, 4]
      ])
    })

    test('edge: 1x1 grid', () => {
      const width = 1
      const height = 1
      const grid = new Grid(width, height, () => null)

      const iter = grid.mooreNeighborhoodCoordinatesRowMajor(0, 0, 1)
      const result = toArray(iter)

      expect(result).toStrictEqual([])
    })

    test('edge: 2x2 gird', () => {
      const width = 2
      const height = 2
      const grid = new Grid(width, height, () => null)

      const iter = grid.mooreNeighborhoodCoordinatesRowMajor(0, 0, 1)
      const result = toArray(iter)

      expect(result).toStrictEqual([
        [1, 0]
      , [0, 1]
      , [1, 1]
      ])
    })
  })

  describe('mooreNeighborhoodCoordinatesColumnMajor', () => {
    test('range = 1', () => {
      const width = 3
      const height = 3
      const grid = new Grid(width, height, () => null)

      const iter = grid.mooreNeighborhoodCoordinatesColumnMajor(1, 1, 1)
      const result = toArray(iter)

      expect(result).toStrictEqual([
        [0, 0]
      , [0, 1]
      , [0, 2]
      , [1, 0]
      , [1, 2]
      , [2, 0]
      , [2, 1]
      , [2, 2]
      ])
    })

    test('range = 2', () => {
      const width = 5
      const height = 5
      const grid = new Grid(width, height, () => null)

      const iter = grid.mooreNeighborhoodCoordinatesColumnMajor(2, 2, 2)
      const result = toArray(iter)

      expect(result).toStrictEqual([
        [0, 0]
      , [0, 1]
      , [0, 2]
      , [0, 3]
      , [0, 4]
      , [1, 0]
      , [1, 1]
      , [1, 2]
      , [1, 3]
      , [1, 4]
      , [2, 0]
      , [2, 1]
      , [2, 3]
      , [2, 4]
      , [3, 0]
      , [3, 1]
      , [3, 2]
      , [3, 3]
      , [3, 4]
      , [4, 0]
      , [4, 1]
      , [4, 2]
      , [4, 3]
      , [4, 4]
      ])
    })

    test('edge: 1x1 grid', () => {
      const width = 1
      const height = 1
      const grid = new Grid(width, height, () => null)

      const iter = grid.mooreNeighborhoodCoordinatesColumnMajor(0, 0, 1)
      const result = toArray(iter)

      expect(result).toStrictEqual([])
    })

    test('edge: 2x2 gird', () => {
      const width = 2
      const height = 2
      const grid = new Grid(width, height, () => null)

      const iter = grid.mooreNeighborhoodCoordinatesColumnMajor(0, 0, 1)
      const result = toArray(iter)

      expect(result).toStrictEqual([
        [0, 1]
      , [1, 0]
      , [1, 1]
      ])
    })
  })
})
