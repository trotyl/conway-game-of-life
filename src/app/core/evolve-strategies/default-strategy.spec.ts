import { TestBed, inject } from '@angular/core/testing'

import { DefaultStrategy } from './default-strategy'

describe('DefaultStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefaultStrategy]
    })
  })

  it('should be created', inject([DefaultStrategy], (service: DefaultStrategy) => {
    expect(service).toBeTruthy()
  }))

  it('should applicable to all cells', inject([DefaultStrategy], (service: DefaultStrategy) => {
    expect(service.applicableTo(0)).toBeTruthy()
    expect(service.applicableTo(1)).toBeTruthy()
    expect(service.applicableTo(2)).toBeTruthy()
    expect(service.applicableTo(3)).toBeTruthy()
    expect(service.applicableTo(4)).toBeTruthy()
  }))

  it('should always die', inject([DefaultStrategy], (service: DefaultStrategy) => {
    expect(service.apply(0, true)).toBeFalsy()
    expect(service.apply(0, false)).toBeFalsy()
    expect(service.apply(3, true)).toBeFalsy()
    expect(service.apply(3, false)).toBeFalsy()
  }))
})
