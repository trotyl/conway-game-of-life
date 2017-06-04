import { Inject, Injectable } from '@angular/core'

import { EVOLVE_STRATEGIES, EvolveStategy } from './evolve-strategies'
import { NeighborCounter } from './neighbor-counter.service'
import { Serializer } from './serializer.service'

@Injectable()
export class Game {
  private readonly cells = new Set<string>()

  constructor(
    @Inject(EVOLVE_STRATEGIES) private strategies: EvolveStategy[],
    private counter: NeighborCounter,
    private serializer: Serializer,
  ) { }

  evolve(): void {
    const counts = this.counter.calculate(this.cells)
    Array.from(counts.entries()).forEach(([cell, count]) => {
      for (const strategy of this.strategies) {
        if (strategy.applicableTo(count)) {
          const [x, y] = this.serializer.deserialize(cell)
          const newStatus = strategy.apply(this.getStatus(x, y))
          this.setStatus(cell, newStatus)

          break
        }
      }
    })
  }

  getStatus(row: number, column: number): boolean {
    const key = this.serializer.serialize(row, column)
    return this.cells.has(key)
  }

  toggleStatus(row: number, column: number): void {
    const key = this.serializer.serialize(row, column)
    this.setStatus(key, !this.cells.has(key))
  }

  private setStatus(cell: string, status: boolean): void {
    if (status) {
      this.cells.add(cell)
    } else {
      this.cells.delete(cell)
    }
  }
}
