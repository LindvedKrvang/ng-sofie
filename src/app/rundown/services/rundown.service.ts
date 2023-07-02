import { Injectable } from '@angular/core'
import { Rundown } from '../../shared/model/rundown'
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs'
import { Identifier } from '../../shared/model/identifier'

const RUNDOWN_URL: string = 'http://localhost:3005/api/rundowns'

@Injectable()
export class RundownService {

  constructor(private http: HttpClient) { }

  fetchRundown(rundownId: string): Observable<Rundown> {
    return this.http.get<Rundown>(`${RUNDOWN_URL}/${rundownId}`).pipe(
      map(value => new Rundown(value))
    )
  }

  fetchRundownIdentifiers(): Observable<Identifier[]> {
    return this.http.get<Identifier[]>(`${RUNDOWN_URL}/identifiers`)
  }

  activate(rundownId: string): Observable<void> {
    return this.http.put<void>(`${RUNDOWN_URL}/${rundownId}/activate`, null)
  }

  deactivate(rundownId: string): Observable<void> {
    return this.http.put<void>(`${RUNDOWN_URL}/${rundownId}/deactivate`, null)
  }

  takeNext(rundownId: string): Observable<void> {
    return this.http.put<void>(`${RUNDOWN_URL}/${rundownId}/takeNext`, null)
  }

  setNext(rundownId: string, segmentId: string, partId: string): Observable<void> {
    return this.http.put<void>(`${RUNDOWN_URL}/${rundownId}/segments/${segmentId}/parts/${partId}/setNext`, null)
  }
}
