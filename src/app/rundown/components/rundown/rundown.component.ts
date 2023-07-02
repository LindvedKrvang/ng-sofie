import { Component, OnDestroy, OnInit } from '@angular/core'
import { Rundown } from '../../../shared/model/rundown'
import { ActivatedRoute } from '@angular/router'
import { RundownService } from '../../services/rundown.service'
import { RundownEventService } from '../../services/rundown-event.service'
import {
  AdLibPieceInsertedRundownEvent, InfiniteRundownPieceAddedEvent,
  RundownEvent
} from '../../../shared/model/rundown-event'
import { RundownEventType } from '../../../shared/model/rundown-event-type'
import { Segment } from '../../../shared/model/segment'
import { Part } from '../../../shared/model/part'
import { Identifier } from '../../../shared/model/identifier'
import { AdLibPieceService } from '../../services/ad-lib-piece.service'

@Component({
  selector: 'sofie-rundown',
  templateUrl: './rundown.component.html',
  styleUrls: ['./rundown.component.scss']
})
export class RundownComponent implements OnInit, OnDestroy {

  public rundown?: Rundown
  public adLibPieceIdentifiers: Identifier[] = []

  private webSocket: WebSocket

  constructor(
    private route: ActivatedRoute,
    private rundownService: RundownService,
    private rundownEventService: RundownEventService,
    private adLibPieceService: AdLibPieceService
  ) { }

  ngOnInit(): void {
    const rundownId: string | null = this.route.snapshot.paramMap.get('rundownId')
    if (!rundownId) {
      console.log('No rundownId found. Can\'t fetch Rundown')
      return
    }

    this.fetchRundown(rundownId)
    this.fetchAdLibPieceIdentifiers(rundownId)
    this.startListeningForRundownEvent(rundownId)

    window.onbeforeunload = () => this.ngOnDestroy()
  }

  private fetchRundown(rundownId: string): void {
    this.rundownService.fetchRundown(rundownId).subscribe(rundown => {
      this.rundown = rundown
    })
  }

  private fetchAdLibPieceIdentifiers(rundownId: string): void {
    this.adLibPieceService.fetchAdLibPieceIdentifiers(rundownId).subscribe((identifiers: Identifier[]) => {
      this.adLibPieceIdentifiers = identifiers
    })
  }

  private startListeningForRundownEvent(rundownId: string): void {
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
        case RundownEventType.AD_LIB_PIECE_INSERTED: {
          const adLibPieceInsertedEvent: AdLibPieceInsertedRundownEvent = rundownEvent as AdLibPieceInsertedRundownEvent
          this.insertAdLibPiece(adLibPieceInsertedEvent)
          break
        }
        case RundownEventType.INFINITE_RUNDOWN_PIECE_ADDED: {
          const infiniteRundownPieceAddedEvent: InfiniteRundownPieceAddedEvent = rundownEvent as InfiniteRundownPieceAddedEvent
          this.addInfiniteRundownPiece(infiniteRundownPieceAddedEvent)
        }
      }
    })
  }

  private insertAdLibPiece(event: AdLibPieceInsertedRundownEvent): void {
    const segment: Segment | undefined = this.rundown?.segments.find(segment => segment.id === event.segmentId)
    if (!segment) {
      return
    }
    const part: Part | undefined = segment.parts.find(part => part.id === event.partId)
    if (!part) {
      return
    }
    part.insetAdLibPiece(event.adLibPiece)
  }

  private addInfiniteRundownPiece(event: InfiniteRundownPieceAddedEvent): void {
    this.rundown?.addInfinitePiece(event.infinitePiece)
  }

  public ngOnDestroy(): void {
    this.webSocket.close()
  }

  public activateRundown(): void {
    if (!this.rundown?.id) {
      return
    }
    this.rundownService.activate(this.rundown?.id).subscribe()
  }

  public deactivateRundown(): void {
    if (!this.rundown?.id) {
      return
    }
    this.rundownService.deactivate(this.rundown?.id).subscribe()
  }

  public takeNext(): void {
    if (!this.rundown?.id) {
      return
    }
    this.rundownService.takeNext(this.rundown?.id).subscribe()
  }

  public setNext(event: { segmentId: string, partId: string }): void {
    if (!this.rundown?.id) {
      return
    }
    this.rundownService.setNext(this.rundown?.id, event.segmentId, event.partId).subscribe()
  }
}
