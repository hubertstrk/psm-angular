import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { ProgressBarModule } from 'primeng/progressbar'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-loading-indicator',
  standalone: true,
  imports: [CommonModule, ProgressBarModule],
  templateUrl: './loading-indicator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingIndicatorComponent {
  @Input() isLoading = false
}
