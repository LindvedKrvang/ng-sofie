import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { catchError, Observable } from 'rxjs'
import { Identifier } from '../../shared/model/identifier'
import { HttpErrorService } from '../../shared/service/http-error.service'

const AD_LIB_PIECE_URL: string = 'http://localhost:3005/api/adLibPieces'

@Injectable()
export class AdLibPieceService {

  constructor(private http: HttpClient, private httpErrorService: HttpErrorService) { }

  public fetchAdLibPieceIdentifiers(rundownId: string): Observable<Identifier[]> {
    return this.http.get<Identifier[]>(`${AD_LIB_PIECE_URL}/rundowns/${rundownId}`)
      .pipe(
        catchError((error) => this.httpErrorService.catchError(error))
      )
  }

  public executeAdLibPiece(rundownId: string, adLibIdentifier: Identifier): Observable<void> {
    return this.http.put<void>(`${AD_LIB_PIECE_URL}/${adLibIdentifier.id}/rundowns/${rundownId}`, null)
      .pipe(
        catchError((error) => this.httpErrorService.catchError(error))
      )
  }
}
