import { Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PsmService } from '../../services/psm.service'
import { ActiveAgent, Code, Psm } from '../../models/psm.model'
import { DropdownModule } from 'primeng/dropdown'
import { FormsModule } from '@angular/forms'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  firstValueFrom,
  Subject,
} from 'rxjs'
import { ProgressBarModule } from 'primeng/progressbar'
import { intersection } from 'lodash'
import { InputTextModule } from 'primeng/inputtext'

@Component({
  selector: 'app-psm-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    DropdownModule,
    InputTextModule,
  ],
  providers: [PsmService],
  templateUrl: './psm-list.component.html',
})
export class PsmListComponent implements OnInit {
  private psmService = inject(PsmService)

  isLoading = false

  psm: Psm[] = []

  search = ''
  searchSubject = new Subject<string>()
  scopes: Code[] = []
  selectedScope: Code | null = null

  activeAgents: ActiveAgent[] = []
  selectedActiveAgent: ActiveAgent | null = null

  scopeFilterSubject = new BehaviorSubject<string[]>([])
  activeAgentFilterSubject = new BehaviorSubject<string[]>([])
  nameFilterSubject = new BehaviorSubject<string[]>([])

  ngOnInit(): void {
    this.psmService.getCodeListByNumber(21).subscribe((data) => {
      this.scopes = data
    })

    this.psmService.getActiveAgents().subscribe((data) => {
      this.activeAgents = data
    })

    this.searchSubject.pipe(debounceTime(500)).subscribe((searchTerm) => {
      this.filterByName(searchTerm)
    })

    combineLatest([
      this.scopeFilterSubject,
      this.activeAgentFilterSubject,
      this.nameFilterSubject,
    ]).subscribe(([scopeFilterIds, activeAgentFilterIds, nameFilterIds]) => {
      this.onFilterChanged([
        scopeFilterIds,
        activeAgentFilterIds,
        nameFilterIds,
      ])
    })
  }

  async filterByScope(): Promise<void> {
    this.isLoading = true
    try {
      const result = this.selectedScope
        ? await firstValueFrom(
            this.psmService.getPsmIdsByScope(this.selectedScope?.code ?? '')
          )
        : []
      this.scopeFilterSubject.next(result.map((x) => x.psmId))
    } finally {
      this.isLoading = false
    }
  }

  async filterByActiveAgent(): Promise<void> {
    this.isLoading = true
    try {
      const result = this.selectedActiveAgent
        ? await firstValueFrom(
            this.psmService.getPsmIdsByActiveAgent(
              this.selectedActiveAgent?.id ?? ''
            )
          )
        : []
      this.activeAgentFilterSubject.next(result.map((x) => x.psmId))
    } finally {
      this.isLoading = false
    }
  }

  async filterByName(search: string): Promise<void> {
    this.isLoading = true
    try {
      const result = this.search
        ? await firstValueFrom(this.psmService.getPsmByName(search))
        : []
      this.nameFilterSubject.next(result.map((x) => x.id))
    } finally {
      this.isLoading = false
    }
  }

  onSearchChange(): void {
    this.searchSubject.next(this.search)
  }

  async onFilterChanged(
    combined: [string[], string[], string[]]
  ): Promise<void> {
    this.isLoading = true
    this.psm = []

    try {
      const filtered = combined.filter((x) => x.length > 0)
      const ids = intersection(...filtered)

      if (!ids.length) {
        return
      }

      const queries = ids.map((id) =>
        firstValueFrom(this.psmService.getPsmById(id))
      )
      this.psm = await Promise.all(queries)
    } catch (error) {
      console.error(error)
    } finally {
      this.isLoading = false
    }
  }
}
