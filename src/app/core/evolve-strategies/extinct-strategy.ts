import { Injectable } from '@angular/core'

import { EvolveStategy } from './abstract-strategy'

@Injectable()
export class ExtinctStrategy implements EvolveStategy {
  applicableTo(count: number): boolean {
    return count < 2 || count > 3
  }

  apply(status: boolean): boolean {
    return false
  }
}
