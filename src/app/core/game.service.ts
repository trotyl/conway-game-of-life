import { Injectable } from '@angular/core'

import { NeighborCounterService } from './neighbor-counter.service'
import { SerializerService } from './serializer.service'

@Injectable()
export class GameService {
  private readonly cells = new Set<string>()

  constructor(
    private neighborCounterService: NeighborCounterService,
    private serializerService: SerializerService,
  ) { }

  evolve(): void {
    this.neighborCounterService.calculate(this.cells)
  }

  getStatus(row: number, column: number): boolean {
    const key = this.serializerService.serialize(row, column)
    return this.cells.has(key)
  }

  toggleStatus(row: number, column: number): void {
    const key = this.serializerService.serialize(row, column)
    if (this.cells.has(key)) {
      this.cells.delete(key)
    } else {
      this.cells.add(key)
    }
  }
}
