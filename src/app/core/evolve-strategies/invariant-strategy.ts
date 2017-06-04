import { Injectable } from '@angular/core'

import { EvolveStategy } from './abstract-strategy'

@Injectable()
export class InvariantStrategy implements EvolveStategy {
  applicableTo(count: number): boolean {
    return count === 2
  }

  apply(status: boolean): boolean {
    return status
  }
}
