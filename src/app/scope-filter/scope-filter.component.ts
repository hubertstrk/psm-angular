import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { Code } from '../../models/psm.model'
import { PsmService } from '../../services/psm.service'
import { DropdownModule } from 'primeng/dropdown'
import { FormsModule } from '@angular/forms'
import { firstValueFrom } from 'rxjs'
import { TagModule } from 'primeng/tag'

@Component({
  selector: 'app-scope-filter',
  standalone: true,
  imports: [FormsModule, DropdownModule, TagModule],
  templateUrl: './scope-filter.component.html',
})
export class ScopeFilterComponent implements OnInit {
  constructor(private psmService: PsmService) {}

  @Output() filtered = new EventEmitter<string[]>()

  scopes: Code[] = []
  selectedScope: Code | null = null

  ngOnInit(): void {
    this.psmService.getCodeListByNumber(21).subscribe((data) => {
      this.scopes = data
    })
  }

  async filterByScope(): Promise<void> {
    const result = this.selectedScope
      ? await firstValueFrom(
          this.psmService.getPsmIdsByScope(this.selectedScope?.code ?? '')
        )
      : []
    this.filtered.emit(result.map((x) => x.psmId))
  }
}
