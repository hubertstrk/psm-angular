import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core'
import { ActiveAgent } from '../../models/psm.model'
import { PsmService } from '../../services/psm.service'
import { DropdownModule } from 'primeng/dropdown'
import { FormsModule } from '@angular/forms'
import { firstValueFrom } from 'rxjs'

@Component({
  selector: 'app-agent-filter',
  standalone: true,
  imports: [FormsModule, DropdownModule],
  templateUrl: './agent-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentFilterComponent implements OnInit {
  constructor(private psmService: PsmService) {}

  @Output() filtered = new EventEmitter<string[]>()

  activeAgents: ActiveAgent[] = []
  selectedActiveAgent: ActiveAgent | null = null

  ngOnInit(): void {
    this.psmService.getActiveAgents().subscribe((data) => {
      this.activeAgents = data
    })
  }

  async filterByActiveAgent(): Promise<void> {
    const result = this.selectedActiveAgent
      ? await firstValueFrom(
          this.psmService.getPsmIdsByActiveAgent(
            this.selectedActiveAgent?.id ?? ''
          )
        )
      : []
    this.filtered.next(result.map((x) => x.psmId))
  }
}