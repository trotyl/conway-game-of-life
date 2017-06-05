import { TestBed, inject } from '@angular/core/testing'

import { NeighborCounter } from './neighbor-counter.service'
import { Serializer } from './serializer.service'
import { parsePositions, parseCounts, toSortedArray } from './test-utils'

describe('NeighborCounter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Serializer,
        NeighborCounter,
      ]
    })
  })

  it('should be created', inject([NeighborCounter], (counter: NeighborCounter) => {
    expect(counter).toBeTruthy()
  }))

  it('should be able to count neighbors for single point', inject([NeighborCounter], (counter: NeighborCounter) => {
    const counts = counter.calculate(parsePositions(`
      ---
      -X-
      ---
    `))

    expect(toSortedArray(counts.entries())).toEqual(parseCounts(`
      111
      101
      111
    `))
  }))

  it('should be able to count neighbors for multi points', inject([NeighborCounter], (counter: NeighborCounter) => {
    const counts = counter.calculate(parsePositions(`
      ----
      -XX-
      -X--
      ----
    `))

    expect(toSortedArray(counts.entries())).toEqual(parseCounts(`
      1221
      2221
      2231
      1110
    `))
  }))
})
