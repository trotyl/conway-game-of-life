import { TestBed, inject } from '@angular/core/testing'

import { InvariantStrategy } from './invariant-strategy'

describe('InvariantStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvariantStrategy]
    })
  })

  it('should be created', inject([InvariantStrategy], (service: InvariantStrategy) => {
    expect(service).toBeTruthy()
  }))

  it('should only applicable to cell with 2 neighbors', inject([InvariantStrategy], (service: InvariantStrategy) => {
    expect(service.applicableTo(0)).toBeFalsy()
    expect(service.applicableTo(1)).toBeFalsy()
    expect(service.applicableTo(2)).toBeTruthy()
    expect(service.applicableTo(3)).toBeFalsy()
    expect(service.applicableTo(4)).toBeFalsy()
  }))

  it('should keep current status', inject([InvariantStrategy], (service: InvariantStrategy) => {
    expect(service.apply(true)).toBeTruthy()
    expect(service.apply(false)).toBeFalsy()
  }))
})
