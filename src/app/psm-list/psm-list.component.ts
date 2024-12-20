import { Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { BehaviorSubject, combineLatest, firstValueFrom } from 'rxjs'
import { intersection, sortBy } from 'lodash'

import { PsmService } from '../../services/psm.service'
import { Psm } from '../../models/psm.model'

import { LoadingIndicatorComponent } from '../loading-indicator/loading-indicator.component'
import { ScopeFilterComponent } from '../scope-filter/scope-filter.component'
import { AgentFilterComponent } from '../agent-filter/agent-filter.component'
import { NameSearchComponent } from '../name-search/name-search.component'

@Component({
  selector: 'app-psm-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LoadingIndicatorComponent,
    NameSearchComponent,
    ScopeFilterComponent,
    AgentFilterComponent,
  ],
  providers: [PsmService],
  templateUrl: './psm-list.component.html',
})
export class PsmListComponent implements OnInit {
  private psmService = inject(PsmService)

  isLoading = false

  psm: Psm[] = []

  scopeFilterSubject = new BehaviorSubject<string[]>([])
  activeAgentFilterSubject = new BehaviorSubject<string[]>([])
  nameFilterSubject = new BehaviorSubject<string[]>([])

  ngOnInit(): void {
    combineLatest([
      this.scopeFilterSubject,
      this.activeAgentFilterSubject,
      this.nameFilterSubject,
    ]).subscribe(([scopeFilterIds, activeAgentFilterIds, nameFilterIds]) => {
      const combined = [scopeFilterIds, activeAgentFilterIds, nameFilterIds]
      const filtered = combined.filter((x) => x.length > 0)
      const psmIds = intersection(...filtered)

      this.loadByFilterResult(psmIds)
    })
  }

  scopeFilterChanged(ids: string[]): void {
    this.scopeFilterSubject.next(ids)
  }

  agentFilterChanged(ids: string[]): void {
    this.activeAgentFilterSubject.next(ids)
  }

  nameFilterChanged(ids: string[]): void {
    this.nameFilterSubject.next(ids)
  }

  async loadByFilterResult(ids: string[]): Promise<void> {
    this.isLoading = true

    try {
      const queries = ids.map((id) =>
        firstValueFrom(this.psmService.getPsmById(id))
      )
      const psm = await Promise.all(queries)
      this.psm = sortBy(psm, 'name')
    } finally {
      this.isLoading = false
    }
  }
}
