import { TestBed, inject } from '@angular/core/testing'

import { EVOLVE_STRATEGIES, EvolveStategy } from './evolve-strategies'
import { Game } from './game.service'
import { NeighborCounter } from './neighbor-counter.service'
import { Serializer } from './serializer.service'

describe('Game basics', () => {
  let mockStrategies: EvolveStategy[]

  beforeEach(() => {
    mockStrategies = [{
      applicableTo: () => true,
      apply: () => false
    }]
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: EVOLVE_STRATEGIES, useValue: mockStrategies },
        Serializer,
        NeighborCounter,
        Game,
      ]
    })
  })

  it('should be created', inject([Game], (service: Game) => {
    expect(service).toBeTruthy()
  }))

  it('should provide dead cell by default', inject([Game], (service: Game) => {
    expect(service.getStatus(1, 2)).toBe(false)
  }))

  it('should support toggle dead to alive', inject([Game], (service: Game) => {
    service.toggleStatus(1, 2)

    expect(service.getStatus(1, 2)).toBe(true)
  }))

  it('should support toggle alive to dead', inject([Game], (service: Game) => {
    service.toggleStatus(1, 2)

    service.toggleStatus(1, 2)

    expect(service.getStatus(1, 2)).toBe(false)
  }))

  it('should calculate the neighbor count', inject([
    Game, NeighborCounter
  ], (service: Game, counter: NeighborCounter) => {
    const spy = spyOn(counter, 'calculate').and.returnValue(new Map())

    service.toggleStatus(1, 2)
    service.evolve()

    const [cells] = spy.calls.mostRecent().args as [Set<string>]
    expect(cells.has('1,2')).toBe(true)
  }))

  it('should use evolve strategies for neighbored cells', inject([
    Game, NeighborCounter, EVOLVE_STRATEGIES
  ], (service: Game, counter: NeighborCounter, [strategy]: EvolveStategy[]) => {
    spyOn(counter, 'calculate').and.returnValue(new Map([['1,2', 1]]))
    const spy = spyOn(strategy, 'applicableTo')

    service.evolve()

    expect(spy).toHaveBeenCalledWith(1)
  }))

  it('should apply strategy if applicable', inject([
    Game, NeighborCounter, EVOLVE_STRATEGIES
  ], (service: Game, counter: NeighborCounter, [strategy]: EvolveStategy[]) => {
    spyOn(counter, 'calculate').and.returnValue(new Map([['1,2', 1]]))
    spyOn(strategy, 'applicableTo').and.returnValue(true)
    const spy = spyOn(strategy, 'apply').and.returnValue(true)

    service.evolve()

    expect(spy).toHaveBeenCalledWith(false)
    expect(service.getStatus(1, 2)).toBeTruthy()
  }))

  it('should not apply strategy if not applicable', inject([
    Game, NeighborCounter, EVOLVE_STRATEGIES
  ], (service: Game, counter: NeighborCounter, [strategy]: EvolveStategy[]) => {
    spyOn(counter, 'calculate').and.returnValue(new Map([['1,2', 1]]))
    spyOn(strategy, 'applicableTo').and.returnValue(false)
    const spy = spyOn(strategy, 'apply').and.returnValue(true)

    service.evolve()

    expect(spy).not.toHaveBeenCalled()
    expect(service.getStatus(1, 2)).toBeFalsy()
  }))
})

describe('Game with multi strategy', () => {
  let mockStrategies: EvolveStategy[]

  beforeEach(() => {
    mockStrategies = [{
      applicableTo: () => true,
      apply: () => false
    }, {
      applicableTo: () => true,
      apply: () => false
    }]
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: EVOLVE_STRATEGIES, useValue: mockStrategies },
        Serializer,
        NeighborCounter,
        Game,
      ]
    })
  })

  it('should only apply one strategy to one cell', inject([
    Game, NeighborCounter, EVOLVE_STRATEGIES
  ], (service: Game, counter: NeighborCounter, [strategyOne, strategyTwo]: EvolveStategy[]) => {

    spyOn(counter, 'calculate').and.returnValue(new Map([['1,2', 1]]))
    spyOn(strategyOne, 'applicableTo').and.returnValue(true)
    spyOn(strategyTwo, 'applicableTo').and.returnValue(true)
    const spyOne = spyOn(strategyOne, 'apply').and.returnValue(true)
    const spyTwo = spyOn(strategyTwo, 'apply').and.returnValue(true)

    service.evolve()

    expect(spyOne).toHaveBeenCalled()
    expect(spyTwo).not.toHaveBeenCalled()
  }))
})
