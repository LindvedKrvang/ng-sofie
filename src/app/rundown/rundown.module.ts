import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RundownOverviewComponent } from './components/rundown-overview/rundown-overview.component'
import { RundownService } from './services/rundown.service'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatCardModule } from '@angular/material/card'
import { SegmentComponent } from './components/segment/segment.component'
import { PartComponent } from './components/part/part.component'
import { RundownComponent } from './components/rundown/rundown.component'
import { RundownEventService } from './services/rundown-event.service'
import { MatButtonToggleModule } from '@angular/material/button-toggle'


@NgModule({
  declarations: [
    RundownOverviewComponent,
    SegmentComponent,
    PartComponent,
    RundownComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatButtonToggleModule
  ],
  providers: [
    RundownService,
    RundownEventService
  ]
})
export class RundownModule { }
