import { Injectable } from '@angular/core'

function serialize(row: number, column: number) {
  return `${row},${column}`
}

@Injectable()
export class GameService {
  private readonly cells = new Set<string>()

  evolve(): void { }

  getStatus(row: number, column: number): boolean {
    const key = serialize(row, column)
    return this.cells.has(key)
  }

  toggleStatus(row: number, column: number): void {
    const key = serialize(row, column)
    if (this.cells.has(key)) {
      this.cells.delete(key)
    } else {
      this.cells.add(key)
    }
  }
}
