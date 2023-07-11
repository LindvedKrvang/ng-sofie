import { Component, Input, OnInit } from '@angular/core'
import { Piece } from '../../../shared/models/piece'

@Component({
  selector: 'sofie-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss']
})
export class PieceComponent {

  @Input()
  public piece: Piece

  constructor() { }
}
