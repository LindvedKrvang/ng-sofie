import {Observable} from 'rxjs';
import {Identifier} from '../../shared/models/identifier';

export interface RundownPlaylistServiceInterface {
  fetchRundownPlaylistIdentifiers(): Observable<Identifier[]>
}
