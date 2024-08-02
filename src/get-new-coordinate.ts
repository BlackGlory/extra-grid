import { Direction } from './direction.js'

/**
 * 得出"在当前位置朝对应方向移动一定距离"后的新坐标.
 */
export function getNewCoordinate(
  x: number
, y: number
, direction: Direction
, distance: number
): [x: number, y: number] {
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
}
