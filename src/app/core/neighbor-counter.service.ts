import { Injectable } from '@angular/core'

import { SerializerService } from './serializer.service'

@Injectable()
export class NeighborCounterService {
  constructor(private serializerService: SerializerService) { }

  calculate(cells: Set<string>): Map<string, number> {
    const counts = new Map<string, number>()

    cells.forEach((cell) => {
      const [x, y] = this.serializerService.deserialize(cell)

      const neighbors = [
        this.serializerService.serialize(x - 1, y - 1),
        this.serializerService.serialize(x - 1, y),
        this.serializerService.serialize(x - 1, y + 1),
        this.serializerService.serialize(x, y - 1),
        this.serializerService.serialize(x, y + 1),
        this.serializerService.serialize(x + 1, y - 1),
        this.serializerService.serialize(x + 1, y),
        this.serializerService.serialize(x + 1, y + 1),
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
