import { getManhattanDistance } from './get-manhattan-distance.js'

/**
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
export function isVonNeumannNeighborOf(
  subject: [number, number]
, object: [number, number]
, range: number = 1
): boolean {
  const distance = getManhattanDistance(subject, object)

  return distance > 0
      && distance <= range
}

/**
 * @param range 
   * - 该值为1时:
   *   ```
   *   ooo
   *   oxo
   *   ooo
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
export function isMooreNeighborOf(
  subject: [number, number]
, object: [number, number]
, range: number = 1
): boolean {
  const [subjectX, subjectY] = subject
  const [objectX, objectY] = object

  if (subjectX === objectX && subjectY === objectY) return false

  const startX = objectX - range
  const endX = objectX + range
  const startY = objectY - range
  const endY = objectY + range

  return subjectX >= startX
      && subjectX <= endX
      && subjectY >= startY
      && subjectY <= endY
}
