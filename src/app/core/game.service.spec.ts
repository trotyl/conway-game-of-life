import { TestBed, inject } from '@angular/core/testing'

import { GameService } from './game.service'

describe('GameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameService]
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
})
