import { Injectable } from '@angular/core'

@Injectable()
export class NeighborCounterService {
  calculate(cells: Set<string>): Map<string, number> {
    const counts = new Map<string, number>()

    cells.forEach((cell) => {
      const [x, y] = cell.split(',').map(str => Number.parseInt(str)) as [number, number]

      const neighbors = [
        `${x - 1},${y - 1}`,
        `${x - 1},${y}`,
        `${x - 1},${y + 1}`,
        `${x},${y - 1}`,
        `${x},${y + 1}`,
        `${x + 1},${y - 1}`,
        `${x + 1},${y}`,
        `${x + 1},${y + 1}`,
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
