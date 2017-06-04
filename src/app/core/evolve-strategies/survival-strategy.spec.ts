import { TestBed, inject } from '@angular/core/testing'

import { SurvivalStrategy } from './survival-strategy'

describe('SurvivalStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SurvivalStrategy]
    })
  })

  it('should be created', inject([SurvivalStrategy], (service: SurvivalStrategy) => {
    expect(service).toBeTruthy()
  }))
})
