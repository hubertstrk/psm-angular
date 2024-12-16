import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { PsmQueryResult, Psm } from '../models/psm.model'

@Injectable({ providedIn: 'root' })
export class PsmService {
  private http = inject(HttpClient)
  private baseUrl = 'https://psm-api.bvl.bund.de/ords/psm/api-v1/mittel/'

  getPsm(): Observable<Psm[]> {
    const url = `${this.baseUrl}?limit=10`
    return this.http.get<PsmQueryResult>(url).pipe(
      map((result) =>
        result.items.map((x) => ({
          id: x.kennr,
          name: x.mittelname,
          formula: x.formulierung_art,
          firstApprovedAt: new Date(x.zul_erstmalig_am),
          lastApprovedAt: new Date(x.zul_ende),
        }))
      )
    )
  }
}
