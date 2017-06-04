import { TestBed, inject } from '@angular/core/testing'

import { GameService } from './game.service'
import { NeighborCounterService } from './neighbor-counter.service'
import { SerializerService } from './serializer.service'

describe('GameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SerializerService,
        NeighborCounterService,
        GameService,
      ]
    })
  })

  it('should be created', inject([GameService], (service: GameService) => {
    expect(service).toBeTruthy()
  }))

  it('should provide dead cell by default', inject([GameService], (service: GameService) => {
    expect(service.getStatus(1, 2)).toBe(false)
  }))

  it('should support toggle dead to alive', inject([GameService], (service: GameService) => {
    service.toggleStatus(1, 2)

    expect(service.getStatus(1, 2)).toBe(true)
  }))

  it('should support toggle alive to dead', inject([GameService], (service: GameService) => {
    service.toggleStatus(1, 2)

    service.toggleStatus(1, 2)

    expect(service.getStatus(1, 2)).toBe(false)
  }))

  it('should calculate the neighbor count', inject([
    GameService, NeighborCounterService
  ], (service: GameService, counter: NeighborCounterService) => {
    const spy = spyOn(counter, 'calculate').and.returnValue(new Map())

    service.toggleStatus(1, 2)
    service.evolve()

    const [cells] = spy.calls.mostRecent().args as [Set<string>]
    expect(cells.has('1,2')).toBe(true)
  }))
})
