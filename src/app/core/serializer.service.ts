import { Injectable } from '@angular/core'

@Injectable()
export class Serializer {
  serialize(row: number, column: number): string {
    return `${row},${column}`
  }

  deserialize(token: string): [number, number] {
    return token.split(',').map(s => Number.parseInt(s)) as [number, number]
  }
}
