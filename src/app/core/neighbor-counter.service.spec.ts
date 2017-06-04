import { TestBed, inject } from '@angular/core/testing'

import { NeighborCounter } from './neighbor-counter.service'
import { Serializer } from './serializer.service'
import { parsePositions, parseCounts, toSortedArray } from './test-utils'

describe('NeighborCounterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Serializer,
        NeighborCounter,
      ]
    })
  })

  it('should be created', inject([NeighborCounter], (service: NeighborCounter) => {
    expect(service).toBeTruthy()
  }))

  it('should be able to count neighbors', inject([NeighborCounter], (service: NeighborCounter) => {
    const counts = service.calculate(parsePositions(`
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
