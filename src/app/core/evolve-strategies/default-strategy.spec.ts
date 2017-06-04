import { TestBed, inject } from '@angular/core/testing'

import { DefaultStrategy } from './default-strategy'

describe('DefaultStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefaultStrategy]
    })
  })

  it('should be created', inject([DefaultStrategy], (strategy: DefaultStrategy) => {
    expect(strategy).toBeTruthy()
  }))

  it('should applicable to all cells', inject([DefaultStrategy], (strategy: DefaultStrategy) => {
    expect(strategy.applicableTo(0)).toBeTruthy()
    expect(strategy.applicableTo(1)).toBeTruthy()
    expect(strategy.applicableTo(2)).toBeTruthy()
    expect(strategy.applicableTo(3)).toBeTruthy()
    expect(strategy.applicableTo(4)).toBeTruthy()
  }))

  it('should always die', inject([DefaultStrategy], (strategy: DefaultStrategy) => {
    expect(strategy.apply(true)).toBeFalsy()
    expect(strategy.apply(false)).toBeFalsy()
  }))
})
