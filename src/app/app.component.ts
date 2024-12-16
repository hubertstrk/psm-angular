import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'psm-angular'
}
