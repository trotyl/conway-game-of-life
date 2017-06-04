import { Injectable } from '@angular/core'

@Injectable()
export class GameService {
  getStatus(row: number, column: number): boolean {
    return false
  }

  toggleStatus(row: number, column: number) { }
}
