export interface Point {
  x: number
  y: number
  c: string
}

export function parseMockup(mockup: string): Point[] {
  return mockup.split(/\s/g)
    .filter(row => row.length !== 0)
    .map((row, i) => ({ x: i, chars: row.split('').map((c, j) => ({ c: c, y: j }))}))
    .reduce(
      (res, { x, chars }) => [...res, ...chars.map(({ c, y }) => ({ x, y, c }))],
      [] as Point[])
}

export function parsePositionsToArray(mockup: string): [number, number][] {
  return parseMockup(mockup)
    .filter(({ c }) => c !== '-')
    .map(({ x, y }) => [x, y] as [number, number])
}

export function parsePositions(mockup: string): Set<string> {
  const positions = parsePositionsToArray(mockup)
    .map(([ x, y ]) => `${x},${y}`)
  return new Set(positions)
}

export function parseCounts(mockup: string): [string, number][] {
  return parseMockup(mockup)
    .filter(({ c }) => c !== '0')
    .map(({ x, y, c }) => [`${x},${y}`, Number.parseInt(c)] as [string, number])
    .sort()
}

export function toSortedArray<T>(iterable: Iterable<T>): T[] {
  return Array.from(iterable).sort()
}
