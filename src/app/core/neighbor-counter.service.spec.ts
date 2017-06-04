import { TestBed, inject } from '@angular/core/testing'

import { NeighborCounterService } from './neighbor-counter.service'

describe('NeighborCounterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NeighborCounterService]
    })
  })

  it('should be created', inject([NeighborCounterService], (service: NeighborCounterService) => {
    expect(service).toBeTruthy()
  }))
})
