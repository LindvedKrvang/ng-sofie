import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatCardModule } from '@angular/material/card'
import { SegmentComponent } from './components/segment/segment.component'
import { PartComponent } from './components/part/part.component'
import { RundownComponent } from './components/rundown/rundown.component'
import { RundownEventService } from './services/rundown-event.service'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { PieceComponent } from './components/piece/piece.component'
import { AdLibPieceComponent } from './components/ad-lib-piece/ad-lib-piece.component';
import { AdLibPieceIdentifierComponent } from './components/ad-lib-piece-identifier/ad-lib-piece-identifier.component'
import { AdLibPieceService } from './services/ad-lib-piece.service'
import { SharedModule } from '../shared/shared.module'


@NgModule({
  declarations: [
    SegmentComponent,
    PartComponent,
    RundownComponent,
    PieceComponent,
    AdLibPieceComponent,
    AdLibPieceIdentifierComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatButtonToggleModule,
    SharedModule
  ],
  providers: [
    RundownEventService,
    AdLibPieceService
  ]
})
export class RundownModule { }
