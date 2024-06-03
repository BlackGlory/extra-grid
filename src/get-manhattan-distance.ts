export function getManhattanDistance(
  a: [number, number]
, b: [number, number]
): number {
  return Math.abs(a[0] - b[0])
       + Math.abs(a[1] - b[1])
}
