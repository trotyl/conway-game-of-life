import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { EVOLVE_STRATEGIES, DefaultStrategy, Game, NeighborCounter, Serializer } from './core'
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
    Serializer,
    NeighborCounter,
    Game,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
