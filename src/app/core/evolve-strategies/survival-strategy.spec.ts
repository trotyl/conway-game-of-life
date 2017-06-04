import { TestBed, inject } from '@angular/core/testing'

import { SurvivalStrategy } from './survival-strategy'

describe('SurvivalStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SurvivalStrategy]
    })
  })

  it('should be created', inject([SurvivalStrategy], (strategy: SurvivalStrategy) => {
    expect(strategy).toBeTruthy()
  }))

  it('should only applicable to cell with 3 neighbors', inject([SurvivalStrategy], (strategy: SurvivalStrategy) => {
    expect(strategy.applicableTo(0)).toBeFalsy()
    expect(strategy.applicableTo(1)).toBeFalsy()
    expect(strategy.applicableTo(2)).toBeFalsy()
    expect(strategy.applicableTo(3)).toBeTruthy()
    expect(strategy.applicableTo(4)).toBeFalsy()
  }))

  it('should always be alive', inject([SurvivalStrategy], (strategy: SurvivalStrategy) => {
    expect(strategy.apply(true)).toBeTruthy()
    expect(strategy.apply(false)).toBeTruthy()
  }))
})
