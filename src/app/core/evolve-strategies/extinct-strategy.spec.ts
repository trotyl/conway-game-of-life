import { TestBed, inject } from '@angular/core/testing'

import { ExtinctStrategy } from './extinct-strategy'

describe('ExtinctStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExtinctStrategy]
    })
  })

  it('should be created', inject([ExtinctStrategy], (strategy: ExtinctStrategy) => {
    expect(strategy).toBeTruthy()
  }))

  it('should not applicable to cell with 2 or 3 neighbors', inject([ExtinctStrategy], (strategy: ExtinctStrategy) => {
    expect(strategy.applicableTo(0)).toBeTruthy()
    expect(strategy.applicableTo(1)).toBeTruthy()
    expect(strategy.applicableTo(2)).toBeFalsy()
    expect(strategy.applicableTo(3)).toBeFalsy()
    expect(strategy.applicableTo(4)).toBeTruthy()
  }))

  it('should always die', inject([ExtinctStrategy], (strategy: ExtinctStrategy) => {
    expect(strategy.apply(true)).toBeFalsy()
    expect(strategy.apply(false)).toBeFalsy()
  }))
})
