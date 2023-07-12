import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Identifier} from '../models/identifier';
import {Segment} from '../models/segment';
import {Part} from '../models/part';
import {RundownServiceInterface} from '../interfaces/rundown-service-interface';
import {MockRundownEventService} from './mock.rundown-event.service';
import {RundownEvent} from '../models/rundown-event';
import {RundownEventType} from '../models/rundown-event-type';
import {Rundown} from '../models/rundown';
import {Piece} from '../models/piece';

const RUNDOWNS: Rundown[] = [
  createRundown('R-1'),
  createRundown('R-2'),
]

function createRundown(rundownId: string): Rundown {
  const segments: Segment[] = []
  for (let i = 0; i < Math.random() * 10; i++) {
    segments.push(createSegment(`${rundownId} S-${i}`, rundownId))
  }
  return new Rundown({
    id: rundownId,
    name: `Rundown ${rundownId}`,
    segments,
    isActive: false,
    infinitePieces: []
  })
}

function createSegment(segmentId: string, rundownId: string): Segment {
  const parts: Part[] = []
  for (let i = 0; i < Math.random() * 10; i++) {
    parts.push(createPart(`${segmentId} P-${i}`, segmentId))
  }
  return new Segment({
    id: segmentId,
    rundownId,
    name: `Segment ${segmentId}`,
    isNext: false,
    isOnAir: false,
    parts
  })
}

function createPart(partId: string, segmentId: string): Part {
  const pieces: Piece[] = []
  for (let i = 0; i < Math.random() * 2; i++) {
    pieces.push(
      {
        id: `${partId} pi-${i}`,
        partId,
        name: `Pi ${i}`,
        layer: 'someLayer'
      }
    )
  }
  return new Part({
    id: partId,
    segmentId,
    isOnAir: false,
    isNext: false,
    pieces
  })
}

@Injectable()
export class MockRundownService implements RundownServiceInterface {

  private currentSegment: Segment
  private currentPart: Part

  private nextSegment: Segment
  private nextPart: Part

  constructor(private eventService: MockRundownEventService) {
  }

  public fetchRundown(rundownId: string): Observable<Rundown> {
    return of(RUNDOWNS.find(rundown => rundown.id === rundownId)!)
  }

  public activate(rundownId: string): Observable<void> {
    const rundown: Rundown = RUNDOWNS.find(rundown => rundown.id === rundownId)!;
    this.currentSegment = rundown.segments[0];
    this.currentPart = this.currentSegment.parts[0]
    this.eventService.doMockEvent({
      type: RundownEventType.ACTIVATE,
      rundownId,
      segmentId: this.currentSegment.id,
      partId: this.currentPart.id
    } as RundownEvent)

    if (this.currentSegment.parts.length > 1) {
      this.setNext(rundownId, this.currentSegment.id, this.currentSegment.parts[1].id)
    } else {
      this.setNext(rundownId, rundown.segments[1].id, rundown.segments[1].parts[0].id)
    }

    return of()
  }

  public deactivate(rundownId: string): Observable<void> {
    this.eventService.doMockEvent({
      type: RundownEventType.DEACTIVATE,
      rundownId
    } as RundownEvent)
    return of();
  }

  public reset(rundownId: string): Observable<void> {
    this.deactivate(rundownId)
    this.activate(rundownId)
    return of();
  }

  public setNext(rundownId: string, segmentId: string, partId: string): Observable<void> {
    const rundown: Rundown = RUNDOWNS.find(rundown => rundown.id === rundownId)!;
    this.nextSegment = rundown.segments.find(segment => segment.id === segmentId)!
    this.nextPart = this.nextSegment.parts.find(part => part.id === partId)!

    this.eventService.doMockEvent({
      type: RundownEventType.SET_NEXT,
      rundownId,
      segmentId,
      partId
    } as RundownEvent)
    return of();
  }

  public takeNext(rundownId: string): Observable<void> {
    const rundown: Rundown = RUNDOWNS.find(rundown => rundown.id === rundownId)!;

    this.currentSegment = this.nextSegment
    this.currentPart = this.nextPart

    this.eventService.doMockEvent({
      type: RundownEventType.TAKE,
      rundownId,
      segmentId: this.currentSegment.id,
      partId: this.currentPart.id
    } as RundownEvent)

    const isLastPartInSegment: boolean = this.currentSegment.parts.findIndex(part => part.id === this.currentPart.id) === (this.currentSegment.parts.length - 1)

    if (isLastPartInSegment) {
      const nextSegmentIndex: number = rundown.segments.findIndex(s => s.id === this.currentSegment.id) + 1
      this.setNext(rundownId, rundown.segments[nextSegmentIndex].id, rundown.segments[nextSegmentIndex].parts[0].id)
    } else {
      const nextPartIndex: number = this.currentSegment.parts.findIndex(part => part.id === this.currentPart.id) + 1
      this.setNext(rundownId, this.currentSegment.id, this.currentSegment.parts[nextPartIndex].id)
    }

    return of();
  }
}
