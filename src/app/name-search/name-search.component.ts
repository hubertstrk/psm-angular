import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { debounceTime, firstValueFrom, Subject } from 'rxjs'
import { PsmService } from '../../services/psm.service'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { InputTextModule } from 'primeng/inputtext'

@Component({
  selector: 'app-name-search',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule],
  templateUrl: './name-search.component.html',
})
export class NameSearchComponent implements OnInit {
  constructor(private psmService: PsmService) {}

  @Output() filtered = new EventEmitter<string[]>()

  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(500)).subscribe((search) => {
      this.filterByName(search)
    })
  }

  search = null
  searchSubject = new Subject<string>()

  onSearchChange(): void {
    this.searchSubject.next(this.search ?? '')
  }

  async filterByName(search: string): Promise<void> {
    const result =
      this.search && this.search !== ''
        ? await firstValueFrom(this.psmService.getPsmByName(search))
        : []
    this.filtered.emit(result.map((psm) => psm.id))
  }
}
