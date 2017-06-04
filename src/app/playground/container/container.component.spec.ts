import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ContainerComponent } from './container.component'

describe('ContainerComponent', () => {
  let component: ContainerComponent
  let fixture: ComponentFixture<ContainerComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerComponent ]
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
})
