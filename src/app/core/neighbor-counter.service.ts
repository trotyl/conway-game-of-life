import { Injectable } from '@angular/core'

import { SerializerService } from './serializer.service'

@Injectable()
export class NeighborCounterService {
  constructor(private serializer: SerializerService) { }

  calculate(cells: Set<string>): Map<string, number> {
    const counts = new Map<string, number>()

    cells.forEach((cell) => {
      const [x, y] = this.serializer.deserialize(cell)

      const neighbors = [
        this.serializer.serialize(x - 1, y - 1),
        this.serializer.serialize(x - 1, y),
        this.serializer.serialize(x - 1, y + 1),
        this.serializer.serialize(x, y - 1),
        this.serializer.serialize(x, y + 1),
        this.serializer.serialize(x + 1, y - 1),
        this.serializer.serialize(x + 1, y),
        this.serializer.serialize(x + 1, y + 1),
      ]

      neighbors.forEach(neighbor => {
        if (!counts.has(neighbor)) {
          counts.set(neighbor, 0)
        }
        counts.set(neighbor, counts.get(neighbor) + 1)
      })
    })

    return counts
  }
}
