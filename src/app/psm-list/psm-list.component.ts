import { Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PsmService } from '../../services/psm.service'
import { ActiveAgent, Code, Psm } from '../../models/psm.model'
import { DropdownModule } from 'primeng/dropdown'
import { FormsModule } from '@angular/forms'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { firstValueFrom } from 'rxjs'
import { ProgressBarModule } from 'primeng/progressbar'
import { intersection } from 'lodash'

@Component({
  selector: 'app-psm-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    DropdownModule,
  ],
  providers: [PsmService],
  templateUrl: './psm-list.component.html',
})
export class PsmListComponent implements OnInit {
  private psmService = inject(PsmService)

  isLoading = false

  psm: Psm[] = []

  scopes: Code[] = []
  selectedScope: Code | null = null

  activeAgents: ActiveAgent[] = []
  selectedActiveAgent: ActiveAgent | null = null

  ngOnInit(): void {
    this.psmService.getCodeListByNumber(21).subscribe((data) => {
      this.scopes = data
    })

    this.psmService.getActiveAgents().subscribe((data) => {
      this.activeAgents = data
    })
  }

  async onFilterChanged(): Promise<void> {
    this.isLoading = true
    this.psm = []

    try {
      const psmScopes = this.selectedScope
        ? await firstValueFrom(
            this.psmService.getPsmIdsByScope(this.selectedScope?.code ?? '')
          )
        : []

      const psmActiveAgent = this.selectedActiveAgent
        ? await firstValueFrom(
            this.psmService.getPsmIdsByActiveAgent(
              this.selectedActiveAgent?.id ?? ''
            )
          )
        : []

      const ids =
        this.selectedScope && this.selectedActiveAgent
          ? intersection(
              psmScopes.map((x) => x.psmId),
              psmActiveAgent.map((x) => x.psmId)
            )
          : [
              ...psmScopes.map((x) => x.psmId),
              ...psmActiveAgent.map((x) => x.psmId),
            ]

      if (!ids.length) {
        return
      }

      // get psm by id
      const queries = ids.map((id) =>
        firstValueFrom(this.psmService.getPsmById(id))
      )

      const psm = await Promise.all(queries)

      this.psm = psm
    } catch (error) {
      console.error(error)
    } finally {
      this.isLoading = false
    }
  }
}
