import { Component, OnInit } from '@angular/core'
import { GameService } from 'app/core/game.service'

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  rows: number[]
  columns: number[]

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.rows = new Array(20).fill(0).map((x, i) => i)
    this.columns = new Array(20).fill(0).map((x, i) => i)
  }

  isCellAlive(row: number, column: number): boolean {
    return this.gameService.getStatus(row, column)
  }

  toggleCell(row: number, column: number) {
    this.gameService.toggleStatus(row, column)
  }
}
