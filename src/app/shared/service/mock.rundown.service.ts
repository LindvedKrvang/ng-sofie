import {Injectable} from '@angular/core';
import {Rundown} from '../model/rundown';
import {Piece} from '../model/piece';
import {RundownService} from './rundown.service';
import {Observable, of} from 'rxjs';
import {Identifier} from '../model/identifier';

const RUNDOWNS: Rundown[] = [
  new Rundown({
    id: 'rundownOne',
    name: 'RundownOne',
    segments: [],
    isActive: false,
    infinitePieces: []
  }),
  new Rundown({
    id: 'rundownTwo',
    name: 'RundownTwo',
    segments: [],
    isActive: false,
    infinitePieces: []
  })
]

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
