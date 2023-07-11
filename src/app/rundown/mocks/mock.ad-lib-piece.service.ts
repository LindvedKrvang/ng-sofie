import {AdLibPieceServiceInterface} from '../interfaces/ad-lib-piece-service-interface';
import {Observable, of} from 'rxjs';
import {Identifier} from '../../shared/models/identifier';

export class MockAdLibPieceService implements AdLibPieceServiceInterface {

  public executeAdLibPiece(rundownId: string, adLibIdentifier: Identifier): Observable<void> {
    return of()
  }

  public fetchAdLibPieceIdentifiers(rundownId: string): Observable<Identifier[]> {
    return of([])
  }
}
