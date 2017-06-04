import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  rows: number[]
  columns: number[]

  ngOnInit() {
    this.rows = new Array(20).fill(0).map((x, i) => i)
    this.columns = new Array(20).fill(0).map((x, i) => i)
  }
}
