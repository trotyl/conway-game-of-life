import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { ContainerComponent } from './playground'
import { GameService, NeighborCounterService, SerializerService } from './core'

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [
    SerializerService,
    NeighborCounterService,
    GameService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
