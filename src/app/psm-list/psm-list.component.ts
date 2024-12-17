import { Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PsmService } from '../../services/psm.service'
import { ActiveAgent, Code, Psm } from '../../models/psm.model'
import { DropdownModule } from 'primeng/dropdown'
import { FormsModule } from '@angular/forms'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { firstValueFrom } from 'rxjs'
import { ProgressBarModule } from 'primeng/progressbar'

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
  }

  async onFilterChanged(): Promise<void> {
    this.isLoading = true
    this.psm = []

    try {
      const ids = this.selectedScope
        ? await firstValueFrom(
            this.psmService.getPsmIdsByScope(this.selectedScope?.code ?? '')
          )
        : []

      if (!ids.length) {
        return
      }

      const queries = ids.map((id) =>
        firstValueFrom(this.psmService.getPsmById(id.psmId))
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
