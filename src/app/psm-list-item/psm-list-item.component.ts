import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ChipModule } from 'primeng/chip'
import { TagModule } from 'primeng/tag'

import { Psm } from '../../models/psm.model'

@Component({
  selector: 'app-psm-list-item',
  standalone: true,
  imports: [CommonModule, ChipModule, TagModule],
  templateUrl: './psm-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PsmListItemComponent {
  @Input() item: Psm | null = null
}
