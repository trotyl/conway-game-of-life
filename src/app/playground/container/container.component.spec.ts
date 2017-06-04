import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing'

import { GameService } from 'app/core'
import { ContainerComponent } from './container.component'

describe('ContainerComponent', () => {
  let component: ContainerComponent
  let fixture: ComponentFixture<ContainerComponent>
  let mockGameService: GameService

  beforeEach(() => {
    mockGameService = {
      evolve: () => {},
      getStatus: () => false,
      toggleStatus: () => {},
    } as any
  })

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerComponent ],
      providers: [
        { provide: GameService, useValue: mockGameService },
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })

  it('should have 20 rows', () => {
    expect(component.rows.length).toBe(20)
  })

  it('should have 20 columns', () => {
    expect(component.columns.length).toBe(20)
  })

  it('should toggle cell status in game', inject([GameService], (game: GameService) =>  {
    spyOn(game, 'toggleStatus')

    component.toggleCell(1, 2)

    expect(game.toggleStatus).toHaveBeenCalledWith(1, 2)
  }))

  it('should get cell status from game', inject([GameService], (game: GameService) => {
    spyOn(game, 'getStatus').and.returnValue(true)

    const status = component.isCellAlive(1, 2)

    expect(status).toBe(true)
    expect(game.getStatus).toHaveBeenCalledWith(1, 2)
  }))

  it('should be able to step', inject([GameService], (game: GameService) => {
    spyOn(game, 'evolve')

    component.step()

    expect(game.evolve).toHaveBeenCalled()
  }))
})
