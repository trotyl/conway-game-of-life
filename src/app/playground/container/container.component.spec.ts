import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing'

import { GameService } from 'app/core'
import { ContainerComponent } from './container.component'

describe('ContainerComponent', () => {
  let component: ContainerComponent
  let fixture: ComponentFixture<ContainerComponent>
  let mockGameService: GameService

  beforeEach(() => {
    mockGameService = {
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

  it('should toggle cell status in game', inject([GameService], (gameService: GameService) =>  {
    spyOn(gameService, 'toggleStatus')

    component.toggleCell(1, 2)

    expect(gameService.toggleStatus).toHaveBeenCalledWith(1, 2)
  }))

  it('should get cell status from game', inject([GameService], (gameService: GameService) => {
    spyOn(gameService, 'getStatus').and.returnValue(true)

    const status = component.isCellAlive(1, 2)

    expect(status).toBe(true)
    expect(gameService.getStatus).toHaveBeenCalledWith(1, 2)
  }))
})
