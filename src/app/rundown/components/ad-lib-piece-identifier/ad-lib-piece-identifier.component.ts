import { Component, Input, OnInit } from '@angular/core'
import { Identifier } from '../../../shared/model/identifier'
import { AdLibPieceService } from '../../services/ad-lib-piece.service'

@Component({
  selector: 'sofie-ad-lib-piece-identifier',
  templateUrl: './ad-lib-piece-identifier.component.html',
  styleUrls: ['./ad-lib-piece-identifier.component.scss']
})
export class AdLibPieceIdentifierComponent {

  @Input()
  public rundownId: string
  @Input()
  public adLibPieceIdentifier: Identifier

  constructor(private adLibPieceService: AdLibPieceService) { }

  public executeAdLibPiece(): void {
    this.adLibPieceService.executeAdLibPiece(this.rundownId, this.adLibPieceIdentifier).subscribe()
  }
}
