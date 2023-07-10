import {Observable} from 'rxjs';
import {Rundown} from '../model/rundown';
import {Identifier} from '../model/identifier';

export interface RundownServiceInterface {

  fetchRundown(rundownId: string): Observable<Rundown>

  fetchRundownIdentifiers(): Observable<Identifier[]>

  activate(rundownId: string): Observable<void>

  deactivate(rundownId: string): Observable<void>

  reset(rundownId: string): Observable<void>

  takeNext(rundownId: string): Observable<void>

  setNext(rundownId: string, segmentId: string, partId: string): Observable<void>
}
