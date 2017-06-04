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
})
