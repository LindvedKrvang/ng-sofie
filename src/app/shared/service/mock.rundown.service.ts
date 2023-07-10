import {Injectable} from '@angular/core';
import {Rundown} from '../model/rundown';
import {Piece} from '../model/piece';
import {RundownService} from './rundown.service';
import {Observable, of} from 'rxjs';
import {Identifier} from '../model/identifier';
import {Segment} from '../model/segment';
import {Part} from '../model/part';

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
export class MockRundownService extends RundownService {

  override fetchRundown(rundownId: string): Observable<Rundown> {
    return of(RUNDOWNS.find(rundown => rundown.id === rundownId)!)
  }

  override fetchRundownIdentifiers(): Observable<Identifier[]> {
    return of(RUNDOWNS.map(rundown => ({
      id: rundown.id,
      name: rundown.name
    })));
  }
}
