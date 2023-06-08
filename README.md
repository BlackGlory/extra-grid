# extra-grid
## Install
```sh
npm install --save extra-grid
# or
yarn add extra-grid
```

## API
```ts
enum Direction {
  Up
, Down
, Left
, Right
, UpLeft
, UpRight
, DownLeft
, DownRight
}
```

### reverseDirection
```ts
function reverseDirection(direction: Direction): Direction
```

### Grid
```ts
class erid<T> {
  readonly width: number
  readonly height: number

  constructor(
    width: number
  , height: number
  , createCell: (x: number, y: number) => T
  )

  get(x: number, y: number): T
  set(x: number, y: number, value: T): void

  getNewCoordinate(
    x: number
  , y: number
  , direction: Direction
  , distance: number = 1
  ): { x: number; y: number } | null

  coordinates(): IterableIterator<[x: number, y: number]>
  coordinatesRowMajor(): IterableIterator<[x: number, y: number]>
  coordinatesColumnMajor(): IterableIterator<[x: number, y: number]>

  neighborCoordinates(
    x: number
  , y: number
  , distance: number = 1
  ): IterableIterator<[x: number, y: number]>
  neighborCoordinatesRowMajor(
    x: number
  , y: number
  , distance: number = 1
  ): IterableIterator<[x: number, y: number]>
  neighborCoordinatesColumnMajor(
    x: number
  , y: number
  , distance: number = 1
  ): IterableIterator<[x: number, y: number]>
}
```
