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

### getManhattanDistance
```ts
function getManhattanDistance(a: [number, number], b: [number, number]): number
```

### getNewCoordinate
```ts
function getNewCoordinate(
  x: number
, y: number
, direction: Direction
, distance: number
): [x: number, y: number]
```

### Grid
```ts
class Grid<T> {
  readonly width: number
  readonly height: number

  constructor(
    width: number
  , height: number
  , createCell: (x: number, y: number) => T
  )

  get(x: number, y: number): T
  tryGet(x: number, y: number): T | null

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

  vonNeumannNeighborhoodCoordinates(
    x: number
  , y: number
  , range: number = 1
  ): IterableIterator<[x: number, y: number]>
  vonNeumannNeighborhoodCoordinatesRowMajor(
    x: number
  , y: number
  , range: number = 1
  ): IterableIterator<[x: number, y: number]>
  vonNeumannNeighborhoodCoordinatesColumnMajor(
    x: number
  , y: number
  , range: number = 1
  ): IterableIterator<[x: number, y: number]>

  mooreNeighborhoodCoordinates(
    x: number
  , y: number
  , range: number = 1
  ): IterableIterator<[x: number, y: number]>
  mooreNeighborhoodCoordinatesRowMajor(
    x: number
  , y: number
  , range: number = 1
  ): IterableIterator<[x: number, y: number]>
  mooreNeighborhoodCoordinatesColumnMajor(
    x: number
  , y: number
  , range: number = 1
  ): IterableIterator<[x: number, y: number]>
}
```
