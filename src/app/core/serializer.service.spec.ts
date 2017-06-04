import { TestBed, inject } from '@angular/core/testing'

import { Serializer } from './serializer.service'

describe('Serializer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Serializer]
    })
  })

  it('should be created', inject([Serializer], (serializer: Serializer) => {
    expect(serializer).toBeTruthy()
  }))

  it('should be able to serialize cell', inject([Serializer], (serializer: Serializer) => {
    expect(serializer.serialize(1, 2)).toBe('1,2')
  }))

  it('should be able to deserialize token', inject([Serializer], (serializer: Serializer) => {
    expect(serializer.deserialize('1,2')).toEqual([1, 2])
  }))
})
