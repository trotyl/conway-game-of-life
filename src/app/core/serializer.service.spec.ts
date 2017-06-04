import { TestBed, inject } from '@angular/core/testing'

import { SerializerService } from './serializer.service'

describe('SerializerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SerializerService]
    })
  })

  it('should be created', inject([SerializerService], (service: SerializerService) => {
    expect(service).toBeTruthy()
  }))

  it('should be able to serialize cell', inject([SerializerService], (service: SerializerService) => {
    expect(service.serialize(1, 2)).toBe('1,2')
  }))

  it('should be able to deserialize token', inject([SerializerService], (service: SerializerService) => {
    expect(service.deserialize('1,2')).toEqual([1, 2])
  }))
})
