import { TestBed, inject } from '@angular/core/testing'

import { EVOLVE_STRATEGIES, EvolveStategy, SurvivalStrategy, InvariantStrategy, DefaultStrategy } from './evolve-strategies'
import { Game } from './game.service'
import { NeighborCounter } from './neighbor-counter.service'
import { Serializer } from './serializer.service'
import { parseMockup, parsePositionsToArray } from './test-utils'

function initGame(game: Game, mockup: string) {
  game.reset()
  parsePositionsToArray(mockup).forEach(([x, y]) => game.toggleStatus(x, y))
}

function expectGameAs(game: Game, mockup: string) {
  parseMockup(mockup)
    .forEach(({ x, y, c }) => {
      expect(game.getStatus(x, y)).toBe(c !== '-')
    })
}

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

  it('should be created', inject([Game], (game: Game) => {
    expect(game).toBeTruthy()
  }))

  it('should provide dead cell by default', inject([Game], (game: Game) => {
    expect(game.getStatus(1, 2)).toBe(false)
  }))

  it('should support toggle dead to alive', inject([Game], (game: Game) => {
    game.toggleStatus(1, 2)

    expect(game.getStatus(1, 2)).toBe(true)
  }))

  it('should support toggle alive to dead', inject([Game], (game: Game) => {
    game.toggleStatus(1, 2)

    game.toggleStatus(1, 2)

    expect(game.getStatus(1, 2)).toBe(false)
  }))

  it('should calculate the neighbor count', inject([
    Game, NeighborCounter
  ], (game: Game, counter: NeighborCounter) => {
    const spy = spyOn(counter, 'calculate').and.returnValue(new Map())

    game.toggleStatus(1, 2)
    game.evolve()

    const [cells] = spy.calls.mostRecent().args as [Set<string>]
    expect(cells.has('1,2')).toBe(true)
  }))

  it('should use evolve strategies for neighbored cells', inject([
    Game, NeighborCounter, EVOLVE_STRATEGIES
  ], (game: Game, counter: NeighborCounter, [strategy]: EvolveStategy[]) => {
    spyOn(counter, 'calculate').and.returnValue(new Map([['1,2', 1]]))
    const spy = spyOn(strategy, 'applicableTo')

    game.evolve()

    expect(spy).toHaveBeenCalledWith(1)
  }))

  it('should apply strategy if applicable', inject([
    Game, NeighborCounter, EVOLVE_STRATEGIES
  ], (game: Game, counter: NeighborCounter, [strategy]: EvolveStategy[]) => {
    spyOn(counter, 'calculate').and.returnValue(new Map([['1,2', 1]]))
    spyOn(strategy, 'applicableTo').and.returnValue(true)
    const spy = spyOn(strategy, 'apply').and.returnValue(true)

    game.evolve()

    expect(spy).toHaveBeenCalledWith(false)
    expect(game.getStatus(1, 2)).toBeTruthy()
  }))

  it('should not apply strategy if not applicable', inject([
    Game, NeighborCounter, EVOLVE_STRATEGIES
  ], (game: Game, counter: NeighborCounter, [strategy]: EvolveStategy[]) => {
    spyOn(counter, 'calculate').and.returnValue(new Map([['1,2', 1]]))
    spyOn(strategy, 'applicableTo').and.returnValue(false)
    const spy = spyOn(strategy, 'apply').and.returnValue(true)

    game.evolve()

    expect(spy).not.toHaveBeenCalled()
    expect(game.getStatus(1, 2)).toBeFalsy()
  }))

  it('should be able to reset', inject([Game], (game: Game) => {
    game.toggleStatus(1, 2)

    game.reset()

    expect(game.getStatus(1, 2)).toBe(false)
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
  ], (game: Game, counter: NeighborCounter, [strategyOne, strategyTwo]: EvolveStategy[]) => {

    spyOn(counter, 'calculate').and.returnValue(new Map([['1,2', 1]]))
    spyOn(strategyOne, 'applicableTo').and.returnValue(true)
    spyOn(strategyTwo, 'applicableTo').and.returnValue(true)
    const spyOne = spyOn(strategyOne, 'apply').and.returnValue(true)
    const spyTwo = spyOn(strategyTwo, 'apply').and.returnValue(true)

    game.evolve()

    expect(spyOne).toHaveBeenCalled()
    expect(spyTwo).not.toHaveBeenCalled()
  }))
})

describe('Game integration', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: EVOLVE_STRATEGIES, useClass: SurvivalStrategy, multi: true },
        { provide: EVOLVE_STRATEGIES, useClass: InvariantStrategy, multi: true },
        { provide: EVOLVE_STRATEGIES, useClass: DefaultStrategy, multi: true },
        Serializer,
        NeighborCounter,
        Game,
      ]
    })
  })

  it('should result to square for right angle', inject([Game], (game: Game) => {
    initGame(game, `
      ----
      -XX-
      -X--
      ----
    `)

    game.evolve()

    expectGameAs(game, `
      ----
      -XX-
      -XX-
      ----
    `)

    game.evolve()

    expectGameAs(game, `
      ----
      -XX-
      -XX-
      ----
    `)
  }))
})
