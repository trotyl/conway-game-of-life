import { InjectionToken } from '@angular/core'

export const EVOLVE_STRATEGIES = new InjectionToken<EvolveStategy[]>('EvolveStategy')

export interface EvolveStategy {
  applicableTo(count: number): boolean
  apply(count: number, status: boolean): boolean
}
