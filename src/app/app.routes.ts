import { Routes } from '@angular/router'
import { PsmListComponent } from './psm-list/psm-list.component'
import { PsmDetailsComponent } from './psm-details/psm-details.component'

export const routes: Routes = [
  { path: '', component: PsmListComponent },
  { path: 'detail/:id', component: PsmDetailsComponent },
]
