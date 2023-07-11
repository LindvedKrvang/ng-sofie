import {Observable} from 'rxjs';
import {Identifier} from '../../shared/model/identifier';

export interface AdLibPieceServiceInterface {

  fetchAdLibPieceIdentifiers(rundownId: string): Observable<Identifier[]>

  executeAdLibPiece(rundownId: string, adLibIdentifier: Identifier): Observable<void>
}
