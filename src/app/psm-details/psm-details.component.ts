import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute } from '@angular/router'

import { forkJoin } from 'rxjs'
import { keyBy, sortBy } from 'lodash'

import { ChipModule } from 'primeng/chip'
import { TagModule } from 'primeng/tag'
import { TableModule } from 'primeng/table'

import { PsmService } from '../../services/psm.service'
import { Code, Psm } from '../../models/psm.model'

@Component({
  selector: 'app-psm-details',
  standalone: true,
  imports: [CommonModule, ChipModule, TagModule, TableModule],
  templateUrl: './psm-details.component.html',
})
export class PsmDetailsComponent implements OnInit {
  id: string = null!

  psm: Psm | null = null
  hazardNotes: Code[] = []
  safetyNotes: Code[] = []
  signalWords: Code[] = []

  packaging: {
    material: Code
    type: Code
    unit: string
    amount: string
  }[] = []

  constructor(
    private route: ActivatedRoute,
    private psmService: PsmService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!

    // general information
    this.psmService.getPsmById(this.id).subscribe((psm) => {
      this.psm = psm
    })

    // signal word
    forkJoin({
      codes: this.psmService.getCodeListByNumber(76),
      signals: this.psmService.getSignalWord(this.id),
    }).subscribe(({ codes, signals }) => {
      const lookup = keyBy(codes, 'code')
      this.signalWords = signals.map((x) => lookup[x.signal]).filter((x) => x)
    })

    // hazard notes
    forkJoin({
      codes: this.psmService.getCodeListByNumber(70),
      notes: this.psmService.getHazardNotes(this.id),
    }).subscribe(({ codes, notes }) => {
      const lookup = keyBy(codes, 'code')
      this.hazardNotes = notes.map((x) => lookup[x.note]).filter((x) => x)
    })

    // safety notes
    forkJoin({
      codes: this.psmService.getCodeListByNumber(71),
      notes: this.psmService.getSafetyNotes(this.id),
    }).subscribe(({ codes, notes }) => {
      const lookup = keyBy(codes, 'code')
      this.safetyNotes = notes.map((x) => lookup[x.note]).filter((x) => x)
    })

    // packaging
    forkJoin({
      types: this.psmService.getCodeListByNumber(61),
      material: this.psmService.getCodeListByNumber(62),
      packaging: this.psmService.getPackaging(this.id),
    }).subscribe(({ types, material, packaging }) => {
      const typesLookup = keyBy(types, 'code')
      const materialLookup = keyBy(material, 'code')

      const unsorted = packaging.map((x) => ({
        material: materialLookup[x.material],
        type: typesLookup[x.type],
        unit: x.unit,
        amount: x.amount,
      }))

      this.packaging = sortBy(unsorted, ['type.value', 'material.value'])
    })
  }
}
