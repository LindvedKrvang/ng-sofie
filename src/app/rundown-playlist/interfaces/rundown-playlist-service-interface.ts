import {Observable} from 'rxjs';
import {Identifier} from '../../shared/model/identifier';

export interface RundownPlaylistServiceInterface {
  fetchRundownPlaylistIdentifiers(): Observable<Identifier[]>
}
