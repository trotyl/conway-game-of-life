import { TestBed, inject } from '@angular/core/testing'

import { InvariantStrategy } from './invariant-strategy'

describe('InvariantStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvariantStrategy]
    })
  })

  it('should be created', inject([InvariantStrategy], (strategy: InvariantStrategy) => {
    expect(strategy).toBeTruthy()
  }))

  it('should only applicable to cell with 2 neighbors', inject([InvariantStrategy], (strategy: InvariantStrategy) => {
    expect(strategy.applicableTo(0)).toBeFalsy()
    expect(strategy.applicableTo(1)).toBeFalsy()
    expect(strategy.applicableTo(2)).toBeTruthy()
    expect(strategy.applicableTo(3)).toBeFalsy()
    expect(strategy.applicableTo(4)).toBeFalsy()
  }))

  it('should keep current status', inject([InvariantStrategy], (strategy: InvariantStrategy) => {
    expect(strategy.apply(true)).toBeTruthy()
    expect(strategy.apply(false)).toBeFalsy()
  }))
})
