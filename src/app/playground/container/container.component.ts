import { Component, OnInit } from '@angular/core'

import { Game } from 'app/core'

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  rows: number[]
  columns: number[]

  constructor(private game: Game) { }

  ngOnInit(): void {
    this.rows = new Array(20).fill(0).map((x, i) => i)
    this.columns = new Array(20).fill(0).map((x, i) => i)
  }

  clear(): void {
    this.game.reset()
  }

  isCellAlive(row: number, column: number): boolean {
    return this.game.getStatus(row, column)
  }

  toggleCell(row: number, column: number): void {
    this.game.toggleStatus(row, column)
  }

  step(): void {
    this.game.evolve()
  }
}
