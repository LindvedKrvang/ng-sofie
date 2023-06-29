import { Component, OnDestroy, OnInit } from '@angular/core'
import { Rundown } from '../../../shared/model/rundown'
import { ActivatedRoute } from '@angular/router'
import { RundownService } from '../../services/rundown.service'
import { RundownEventService } from '../../services/rundown-event.service'
import { RundownEvent } from '../../../shared/model/rundown-event'
import { RundownEventType } from '../../../shared/model/rundown-event-type'

@Component({
  selector: 'sofie-rundown',
  templateUrl: './rundown.component.html',
  styleUrls: ['./rundown.component.scss']
})
export class RundownComponent implements OnInit, OnDestroy {
  public rundown?: Rundown

  private webSocket: WebSocket

  constructor(
    private route: ActivatedRoute,
    private rundownService: RundownService,
    private rundownEventService: RundownEventService
  ) { }

  ngOnInit(): void {
    const rundownId: string | null = this.route.snapshot.paramMap.get('rundownId')
    if (!rundownId) {
      console.log('No rundownId found. Can\'t fetch Rundown')
      return
    }
    this.rundownService.fetchRundown(rundownId).subscribe(rundown => {
      this.rundown = rundown
    })

    this.webSocket = this.rundownEventService.listenForRundownEvents(rundownId, (rundownEvent: RundownEvent) => {
      switch (rundownEvent.type) {
        case RundownEventType.ACTIVATE: {
          this.rundown?.activate(rundownEvent)
          break
        }
        case RundownEventType.DEACTIVATE: {
          this.rundown?.deactivate()
          break
        }
        case RundownEventType.TAKE: {
          this.rundown?.takeNext(rundownEvent)
          break
        }
        case RundownEventType.SET_NEXT: {
          this.rundown?.setNext(rundownEvent)
          break
        }
      }
    })

    window.onbeforeunload = () => this.ngOnDestroy()
  }

  ngOnDestroy(): void {
    this.webSocket.close()
  }

  activateRundown(): void {
    if (!this.rundown?.id) {
      return
    }
    this.rundownService.activate(this.rundown?.id).subscribe()
  }

  deactivateRundown(): void {
    if (!this.rundown?.id) {
      return
    }
    this.rundownService.deactivate(this.rundown?.id).subscribe()
  }

  takeNext(): void {
    if (!this.rundown?.id) {
      return
    }
    this.rundownService.takeNext(this.rundown?.id).subscribe()
  }

  setNext(event: { segmentId: string, partId: string }): void {
    if (!this.rundown?.id) {
      return
    }
    this.rundownService.setNext(this.rundown?.id, event.segmentId, event.partId).subscribe()
  }
}
