import { TestBed, inject } from '@angular/core/testing'

import { Serializer } from './serializer.service'

describe('SerializerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Serializer]
    })
  })

  it('should be created', inject([Serializer], (service: Serializer) => {
    expect(service).toBeTruthy()
  }))

  it('should be able to serialize cell', inject([Serializer], (service: Serializer) => {
    expect(service.serialize(1, 2)).toBe('1,2')
  }))

  it('should be able to deserialize token', inject([Serializer], (service: Serializer) => {
    expect(service.deserialize('1,2')).toEqual([1, 2])
  }))
})
