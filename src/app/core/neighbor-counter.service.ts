import { Injectable } from '@angular/core'

import { Serializer } from './serializer.service'

@Injectable()
export class NeighborCounter {
  constructor(private serializer: Serializer) { }

  calculate(cells: Set<string>): Map<string, number> {
    const counts = new Map<string, number>()

    cells.forEach((cell) => {
      const neighbors = this.getNeighbors(cell)

      neighbors.forEach(neighbor => {
        if (!counts.has(neighbor)) {
          counts.set(neighbor, 0)
        }
        counts.set(neighbor, counts.get(neighbor) + 1)
      })
    })

    return counts
  }

  private getNeighbors(cell: string): string[] {
    const [x, y] = this.serializer.deserialize(cell)

    return [
      [x - 1, y - 1], [x - 1, y], [x - 1, y + 1],
      [x    , y - 1],             [x    , y + 1],
      [x + 1, y - 1], [x + 1, y], [x + 1, y + 1],
    ].map(([row, column]) => this.serializer.serialize(row, column))
  }
}
