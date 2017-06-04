import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ContainerComponent } from './container.component'
import { GameService } from 'app/core/game.service'

describe('ContainerComponent', () => {
  let component: ContainerComponent
  let fixture: ComponentFixture<ContainerComponent>
  let mockGameService: GameService

  beforeEach(() => {
    mockGameService = {
      toggleStatus: () => {}
    }
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

  it('should toggle the cell status in game', () => {
    const gameService = fixture.debugElement.injector.get(GameService)
    spyOn(gameService, 'toggleStatus')

    component.toggleCell(1, 2)

    expect(gameService.toggleStatus).toHaveBeenCalledWith(1, 2)
  })
})
