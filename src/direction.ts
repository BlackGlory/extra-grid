export enum Direction {
  Up
, Down
, Left
, Right
, UpLeft
, UpRight
, DownLeft
, DownRight
}

export function reverseDirection(direction: Direction): Direction {
  switch (direction) {
    case Direction.Up: return Direction.Down
    case Direction.Down: return Direction.Up
    case Direction.Left: return Direction.Right
    case Direction.Right: return Direction.Left
    case Direction.UpLeft: return Direction.DownRight
    case Direction.UpRight: return Direction.DownLeft
    case Direction.DownLeft: return Direction.UpRight
    case Direction.DownRight: return Direction.UpLeft
  }
}
