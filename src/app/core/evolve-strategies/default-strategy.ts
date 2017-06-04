import { Injectable } from '@angular/core'

import { EvolveStategy } from './abstract-strategy'

@Injectable()
export class DefaultStrategy implements EvolveStategy {
  applicableTo(count: number): boolean {
    return true
  }

  apply(count: number, status: boolean): boolean {
    return false
  }
}
