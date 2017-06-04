import { Injectable } from '@angular/core'

import { EvolveStategy } from './abstract-strategy'

@Injectable()
export class SurvivalStrategy implements EvolveStategy {
  applicableTo(count: number): boolean {
    throw new Error('Method not implemented.')
  }

  apply(count: number, status: boolean): boolean {
    throw new Error('Method not implemented.')
  }
}
