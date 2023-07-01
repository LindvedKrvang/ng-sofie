import { Component, Input, OnInit } from '@angular/core'
import { Piece } from '../../../shared/model/piece'

@Component({
  selector: 'sofie-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss']
})
export class PieceComponent implements OnInit {

  @Input()
  public piece: Piece

  constructor() { }

  ngOnInit(): void {
  }

}
