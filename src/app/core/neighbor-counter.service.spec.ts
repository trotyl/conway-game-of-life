import { TestBed, inject } from '@angular/core/testing'

import { NeighborCounterService } from './neighbor-counter.service'
import { SerializerService } from './serializer.service'

interface Point {
  x: number
  y: number
  c: string
}

function parseMockup(mockup: string): Point[] {
  return mockup.split(/\s/g)
    .filter(row => row.length !== 0)
    .map((row, i) => ({ x: i, chars: row.split('').map((c, j) => ({ c: c, y: j }))}))
    .reduce(
      (res, { x, chars }) => [...res, ...chars.map(({ c, y }) => ({ x, y, c }))],
      [] as Point[])
}

function parsePositions(mockup: string): Set<string> {
  const positions = parseMockup(mockup)
    .filter(({ c }) => c !== '-')
    .map(({ x, y }) => `${x},${y}`)
  return new Set(positions)
}

function parseCounts(mockup: string): [string, number][] {
  return parseMockup(mockup)
    .filter(({ c }) => c !== '0')
    .map(({ x, y, c }) => [`${x},${y}`, Number.parseInt(c)] as [string, number])
}

describe('NeighborCounterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SerializerService,
        NeighborCounterService,
      ]
    })
  })

  it('should be created', inject([NeighborCounterService], (service: NeighborCounterService) => {
    expect(service).toBeTruthy()
  }))

  it('should be able to count neighbors', inject([NeighborCounterService], (service: NeighborCounterService) => {
    const counts = service.calculate(parsePositions(`
      ----
      -XX-
      -X--
      ----
    `))

    expect(Array.from(counts.entries()).sort()).toEqual(parseCounts(`
      1221
      2221
      2231
      1110
    `).sort())
  }))
})
