import { Injectable } from '@angular/core'

@Injectable()
export class SerializerService {
  serialize(row: number, column: number): string {
    return `${row},${column}`
  }

  deserialize(token: string): [number, number] {
    return null
  }
}
