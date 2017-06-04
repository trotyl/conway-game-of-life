import { Component } from '@angular/core'
import { TestBed, async } from '@angular/core/testing'

import { AppComponent } from './app.component'

@Component({
  selector: 'app-container',
  template: ''
})
class MockContainerComponent { }

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockContainerComponent
      ],
    }).compileComponents()
  }))

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app).toBeTruthy()
  }))
})
