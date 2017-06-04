import { TestBed, inject } from '@angular/core/testing'

import { NeighborCounterService } from './neighbor-counter.service'
import { SerializerService } from './serializer.service'
import { parsePositions, parseCounts, toSortedArray } from './test-utils'

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

    expect(toSortedArray(counts.entries())).toEqual(parseCounts(`
      1221
      2221
      2231
      1110
    `))
  }))
})
