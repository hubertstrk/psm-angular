import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import {
  Psm,
  ActiveAgent,
  Code,
  PsmScope,
  PsmActiveAgent,
} from '../models/psm.model'

import {
  PsmQueryResult,
  ActiveAgentQueryResult,
  CodeQueryResult,
  PsmScopeQueryResult,
  PsmActiveAgentQueryResult,
} from '../models/query-result.model'

@Injectable({ providedIn: 'root' })
export class PsmService {
  private http = inject(HttpClient)
  private baseUrl = 'https://psm-api.bvl.bund.de/ords/psm/api-v1'

  /**
   * 21: Wirkbereich
   * @param codeListNumber
   * @returns
   */
  getCodeListByNumber(codeListNumber: number): Observable<Code[]> {
    const url = `${this.baseUrl}/kode/?kodeliste=${codeListNumber}&sprache=DE`
    return this.http.get<CodeQueryResult>(url).pipe(
      map((result) =>
        result.items.map((x) => ({
          code: x.kode,
          codeList: x.kodeliste,
          language: x.sprache,
          value: x.kodetext,
          lock: x.sperre,
        }))
      )
    )
  }

  getPsmByName(name: string): Observable<Psm[]> {
    const options = {
      MITTELNAME: {
        $instr: name,
      },
    }

    const encodedQuery = encodeURIComponent(JSON.stringify(options))

    const url = `${this.baseUrl}/mittel/?q=${encodedQuery}`
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

  getPsmById(id: string): Observable<Psm> {
    const url = `${this.baseUrl}/mittel/?kennr=${id}`
    return this.http.get<PsmQueryResult>(url).pipe(
      map((result) => {
        const psm = result.items[0]
        return {
          id: psm.kennr,
          name: psm.mittelname,
          formula: psm.formulierung_art,
          firstApprovedAt: new Date(psm.zul_erstmalig_am),
          lastApprovedAt: new Date(psm.zul_ende),
        }
      })
    )
  }

  getPsmIdsByScope(scope: string): Observable<PsmScope[]> {
    const url = `${this.baseUrl}/mittel_wirkbereich/?wirkungsbereich=${scope}`
    return this.http.get<PsmScopeQueryResult>(url).pipe(
      map((result) => {
        return result.items.map((x) => ({
          psmId: x.kennr,
          scope: x.wirkungsbereich,
        }))
      })
    )
  }

  getActiveAgents(): Observable<ActiveAgent[]> {
    const url = `${this.baseUrl}/wirkstoff/`
    return this.http.get<ActiveAgentQueryResult>(url).pipe(
      map((result) => {
        return result.items.map((x) => ({
          id: x.wirknr,
          name: x.wirkstoffname,
          category: x.kategorie,
          approved: new Date(x.genehmigt),
        }))
      })
    )
  }

  getPsmIdsByActiveAgent(activeAgentId: string): Observable<PsmActiveAgent[]> {
    const url = `${this.baseUrl}/wirkstoff_gehalt/?wirknr=${activeAgentId}`
    return this.http.get<PsmActiveAgentQueryResult>(url).pipe(
      map((result) =>
        result.items.map((x) => ({
          psmId: x.kennr,
          bioContent: x.gehalt_bio,
          bioContentUnit: x.gehalt_bio_einheit,
          contentUnit: x.gehalt_einheit,
          pureContent: x.gehalt_rein,
          pureContentBaseStructure: x.gehalt_rein_grundstruktur,
          activeAgentId: x.wirknr,
          activeAgentVariant: x.wirkvar,
        }))
      )
    )
  }
}
