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

  constructor(private eventService: MockRundownEventService) {
  }

  public fetchRundown(rundownId: string): Observable<Rundown> {
    return of(RUNDOWNS.find(rundown => rundown.id === rundownId)!)
  }

  public fetchRundownIdentifiers(): Observable<Identifier[]> {
    return of(RUNDOWNS.map(rundown => ({
      id: rundown.id,
      name: rundown.name
    })));
  }

  public activate(rundownId: string): Observable<void> {
    const rundown: Rundown = RUNDOWNS.find(rundown => rundown.id === rundownId)!;
    const firstSegment: Segment = rundown.segments[0];
    const firstPart: Part = firstSegment.parts[0]
    this.eventService.doMockEvent({
      type: RundownEventType.ACTIVATE,
      rundownId,
      segmentId: firstSegment.id,
      partId: firstPart.id
    } as RundownEvent)

    if (firstSegment.parts.length > 1) {
      this.setNext(rundownId, firstSegment.id, firstSegment.parts[1].id)
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

    const randomSegmentIndex: number = Math.floor(Math.random() * (rundown.segments.length - 1))
    const segment: Segment = rundown.segments[randomSegmentIndex]

    const randomPartIndex: number = Math.floor(Math.random() * (segment.parts.length - 1))
    const part: Part = segment.parts[randomPartIndex]

    this.eventService.doMockEvent({
      type: RundownEventType.TAKE,
      rundownId,
      segmentId: segment.id,
      partId: part.id
    } as RundownEvent)

    if (segment.parts.length > 1 && randomPartIndex < segment.parts.length - 1) {
      const nextPartIndex: number = segment.parts.findIndex(part => part.id === part.id) + 1
      this.setNext(rundownId, segment.id, segment.parts[nextPartIndex].id)
    } else {
      const nextSegmentIndex: number = rundown.segments.findIndex(s => s.id === segment.id) + 1
      this.setNext(rundownId, rundown.segments[nextSegmentIndex].id, rundown.segments[nextSegmentIndex].parts[0].id)
    }
    return of();
  }
}
