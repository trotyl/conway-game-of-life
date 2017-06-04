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

  it('should only applicable to cell with 3 neighbors', inject([SurvivalStrategy], (service: SurvivalStrategy) => {
    expect(service.applicableTo(0)).toBeFalsy()
    expect(service.applicableTo(1)).toBeFalsy()
    expect(service.applicableTo(2)).toBeFalsy()
    expect(service.applicableTo(3)).toBeTruthy()
    expect(service.applicableTo(4)).toBeFalsy()
  }))

  it('should always be alive', inject([SurvivalStrategy], (service: SurvivalStrategy) => {
    expect(service.apply(true)).toBeTruthy()
    expect(service.apply(false)).toBeTruthy()
  }))
})
