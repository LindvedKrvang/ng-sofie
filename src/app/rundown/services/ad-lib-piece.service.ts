import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Identifier } from '../../shared/model/identifier'

const AD_LIB_PIECE_URL: string = 'http://localhost:3005/api/rundowns'

@Injectable()
export class AdLibPieceService {

  constructor(private http: HttpClient) { }

  fetchAdLibPieceIdentifiers(rundownId: string): Observable<Identifier[]> {
    return this.http.get<Identifier[]>(`${AD_LIB_PIECE_URL}/${rundownId}/adLibPieces`)
  }

  executeAdLibPiece(rundownId: string, adLibIdentifier: Identifier): Observable<void> {
    return this.http.put<void>(`${AD_LIB_PIECE_URL}/${rundownId}/adLibPieces/${adLibIdentifier.id}`, null)
  }
}
