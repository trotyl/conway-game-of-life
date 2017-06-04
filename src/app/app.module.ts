import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { EVOLVE_STRATEGIES, DefaultStrategy, GameService, NeighborCounterService, SerializerService } from './core'
import { ContainerComponent } from './playground'

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [
    { provide: EVOLVE_STRATEGIES, useClass: DefaultStrategy, multi: true },
    SerializerService,
    NeighborCounterService,
    GameService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
