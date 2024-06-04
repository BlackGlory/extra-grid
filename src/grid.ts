import { go, assert } from '@blackglory/prelude'
import { Direction } from './direction.js'
import { getManhattanDistance } from './get-manhattan-distance.js'
import { filter } from 'iterable-operator'

export class Grid<T> {
  private rows: T[][]

  constructor(
    public readonly width: number
  , public readonly height: number
  , createCell: (x: number, y: number) => T
  ) {
    const rows: T[][] = new Array(height) as T[][]
    for (let y = 0; y < height; y++) {
      const row = new Array(width) as T[]
      for (let x = 0; x < width; x++) {
        row[x] = createCell(x, y)
      }
      rows[y] = row
    }
    this.rows = rows
  }

  get(x: number, y: number): T {
    assert(
      x >= 0 && x < this.width &&
      y >= 0 && y < this.height
    , 'Out of bounds'
    )

    return this.rows[y][x]
  }

  set(x: number, y: number, value: T): void {
    assert(
      x >= 0 && x < this.width &&
      y >= 0 && y < this.height
    , 'Out of bounds'
    )

    this.rows[y][x] = value
  }

  /**
   * 得出"在当前位置朝对应方向移动一定距离"后的新坐标.
   * 
   * @returns 如果移动会导致出界, 返回null.
   */
  getNewCoordinate(
    x: number
  , y: number
  , direction: Direction
  , distance: number = 1
  ): { x: number; y: number } | null {
    const [newX, newY] = go(() => {
      switch (direction) {
        case Direction.Up: return [x, y - distance]
        case Direction.Down: return [x, y + distance]
        case Direction.Left: return [x - distance, y]
        case Direction.Right: return [x + distance, y]
        case Direction.UpLeft: return [x - distance, y - distance]
        case Direction.UpRight: return [x + distance, y - distance]
        case Direction.DownLeft: return [x - distance, y + distance]
        case Direction.DownRight: return [x + distance, y + distance]
      }
    })

    if (
      newX >= 0 && newX < this.width &&
      newY >= 0 && newY < this.height
    ) {
      return { x: newX, y: newY }
    } else {
      return null
    }
  }

  /**
   * 遍历坐标, 访问顺序与内部存储的顺序相同.
   */
  coordinates(): IterableIterator<[x: number, y: number]> {
    return this.coordinatesRowMajor()
  }

  /**
   * 从网格左上角开始向右遍历所有单元格.
   */
  * coordinatesRowMajor(): IterableIterator<[x: number, y: number]> {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        yield [x, y]
      }
    }
  }

  /**
   * 从网格左上角开始向下遍历所有单元格.
   */
  * coordinatesColumnMajor(): IterableIterator<[x: number, y: number]> {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        yield [x, y]
      }
    }
  }

  /**
   * 遍历指定单元格von Neumann型邻域的单元格, 访问顺序与内部存储的顺序相同.
   * 
   * @param range
   * - 该值为1时:
   *   ```
   *    o
   *   oxo
   *    o
   *   ```
   * - 该值为2时:
   *   ```
   *     o
   *    ooo
   *   ooxoo
   *    ooo
   *     o
   *   ```
   */
  vonNeumannNeighbourhoodCoordinates(
    x: number
  , y: number
  , range: number = 1
  ): IterableIterator<[x: number, y: number]> {
    return this.vonNeumannNeighbourhoodCoordinatesRowMajor(x, y, range)
  }

  /**
   * 从左上角开始向右遍历指定单元格von Neumann型邻域的单元格.
   * 
   * @param range
   * - 该值为1时:
   *   ```
   *    o
   *   oxo
   *    o
   *   ```
   * - 该值为2时:
   *   ```
   *     o
   *    ooo
   *   ooxoo
   *    ooo
   *     o
   *   ```
   */
  vonNeumannNeighbourhoodCoordinatesRowMajor(
    x: number
  , y: number
  , range: number = 1
  ): IterableIterator<[x: number, y: number]> {
    return filter(
      this.mooreNeighbourhoodCoordinatesRowMajor(x, y, range)
    , coordinate => getManhattanDistance([x, y], coordinate) <= range
    )
  }

  /**
   * 从左上角开始向下遍历指定单元格von Neumann型邻域的单元格.
   * 
   * @param range
   * - 该值为1时:
   *   ```
   *    o
   *   oxo
   *    o
   *   ```
   * - 该值为2时:
   *   ```
   *     o
   *    ooo
   *   ooxoo
   *    ooo
   *     o
   *   ```
   */
  vonNeumannNeighbourhoodCoordinatesColumnMajor(
    x: number
  , y: number
  , range: number = 1
  ): IterableIterator<[x: number, y: number]> {
    return filter(
      this.mooreNeighbourhoodCoordinatesColumnMajor(x, y, range)
    , coordinate => getManhattanDistance([x, y], coordinate) <= range
    )
  }

  /**
   * 遍历指定单元格Moore型邻域的单元格, 访问顺序与内部存储的顺序相同.
   * 
   * @param range
   * - 该值为1时:
   *   ```
   *   ooo
   *   oxo
   *   oxo
   *   ```
   * - 该值为2时:
   *   ```
   *   ooooo
   *   ooooo
   *   ooxoo
   *   ooooo
   *   ooooo
   *   ```
   */
  mooreNeighbourhoodCoordinates(
    x: number
  , y: number
  , range: number = 1
  ): IterableIterator<[x: number, y: number]> {
    return this.mooreNeighbourhoodCoordinatesRowMajor(x, y, range)
  }

  /**
   * 从左上角开始向右遍历指定单元格Moore型邻域的单元格.
   * 
   * @param range
   * - 该值为1时
   *   ```
   *   ooo
   *   oxo
   *   oxo
   *   ```
   * - 该值为2时:
   *   ```
   *   ooooo
   *   ooooo
   *   ooxoo
   *   ooooo
   *   ooooo
   *   ```
   */
  * mooreNeighbourhoodCoordinatesRowMajor(
    x: number
  , y: number
  , range: number = 1
  ): IterableIterator<[x: number, y: number]> {
    const maxX = this.width - 1
    const maxY = this.height - 1

    const startX = Math.max(x - range, 0)
    const endX = Math.min(x + range, maxX)
    const startY = Math.max(y - range, 0)
    const endY = Math.min(y + range, maxY)

    for (let cellY = startY; cellY <= endY; cellY++) {
      for (let cellX = startX; cellX <= endX; cellX++) {
        if (cellX === x && cellY === y) {
          continue
        } else {
          yield [cellX, cellY]
        }
      }
    }
  }

  /**
   * 从左上角开始向下遍历指定单元格Moore型邻域的单元格.
   * 
   * @param range
   * - 该值为1时:
   *   ```
   *   ooo
   *   oxo
   *   oxo
   *   ```
   * - 该值为2时:
   *   ```
   *   ooooo
   *   ooooo
   *   ooxoo
   *   ooooo
   *   ooooo
   *   ```
   */
  * mooreNeighbourhoodCoordinatesColumnMajor(
    x: number
  , y: number
  , range: number = 1
  ): IterableIterator<[x: number, y: number]> {
    const maxX = this.width - 1
    const maxY = this.height - 1

    const startX = Math.max(x - range, 0)
    const endX = Math.min(x + range, maxX)
    const startY = Math.max(y - range, 0)
    const endY = Math.min(y + range, maxY)

    for (let cellX = startX; cellX <= endX; cellX++) {
      for (let cellY = startY; cellY <= endY; cellY++) {
        if (cellX === x && cellY === y) {
          continue
        } else {
          yield [cellX, cellY]
        }
      }
    }
  }
}
