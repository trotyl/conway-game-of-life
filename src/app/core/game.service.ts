import { Injectable } from '@angular/core'

function serialize(row: number, column: number) {
  return `(${row},${column})`
}

@Injectable()
export class GameService {
  private readonly cells = new Map<string, boolean>()

  evolve(): void { }

  getStatus(row: number, column: number): boolean {
    const key = serialize(row, column)
    if (!this.cells.has(key)) {
      this.cells.set(key, false)
    }

    return this.cells.get(key)
  }

  toggleStatus(row: number, column: number): void {
    const key = serialize(row, column)
    const currentStatus = this.getStatus(row, column)
    this.cells.set(key, !currentStatus)
  }
}
