import { Inject, Injectable } from '@angular/core'

import { EVOLVE_STRATEGIES, EvolveStategy } from './evolve-strategies'
import { NeighborCounterService } from './neighbor-counter.service'
import { SerializerService } from './serializer.service'

@Injectable()
export class GameService {
  private readonly cells = new Set<string>()

  constructor(
    @Inject(EVOLVE_STRATEGIES) private strategies: EvolveStategy[],
    private counter: NeighborCounterService,
    private serializer: SerializerService,
  ) { }

  evolve(): void {
    const counts = this.counter.calculate(this.cells)
    Array.from(counts.entries()).forEach(([cell, count]) => {
      this.strategies.forEach(strategy => {
        if (strategy.applicableTo(count)) {
          const [x, y] = this.serializer.deserialize(cell)
          const newStatus = strategy.apply(count, this.getStatus(x, y))
          this.setStatus(cell, newStatus)
        }
      })
    })
  }

  getStatus(row: number, column: number): boolean {
    const key = this.serializer.serialize(row, column)
    return this.cells.has(key)
  }

  toggleStatus(row: number, column: number): void {
    const key = this.serializer.serialize(row, column)
    if (this.cells.has(key)) {
      this.cells.delete(key)
    } else {
      this.cells.add(key)
    }
  }

  private setStatus(cell: string, status: boolean): void {
    if (status) {
      this.cells.add(cell)
    } else {
      this.cells.delete(cell)
    }
  }
}
