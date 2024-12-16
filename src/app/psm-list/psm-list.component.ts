import { Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PsmService } from '../../services/psm.service'
import { Psm } from '../../models/psm.model'
import { CardModule } from 'primeng/card'

@Component({
  selector: 'app-psm-list',
  standalone: true,
  imports: [CommonModule, CardModule],
  providers: [PsmService],
  templateUrl: './psm-list.component.html',
})
export class PsmListComponent implements OnInit {
  private psmService = inject(PsmService)

  psm: Psm[] = []

  ngOnInit(): void {
    this.psmService.getPsm().subscribe((data) => {
      this.psm = data
    })
  }
}
