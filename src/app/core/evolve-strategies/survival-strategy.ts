import { Injectable } from '@angular/core'

import { EvolveStategy } from './abstract-strategy'

@Injectable()
export class SurvivalStrategy implements EvolveStategy {
  applicableTo(count: number): boolean {
    return count === 3
  }

  apply(count: number, status: boolean): boolean {
    return true
  }
}
