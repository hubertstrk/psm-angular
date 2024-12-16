export interface PsmQueryResult {
  items: {
    formulierung_art: string
    kennr: string
    mittelname: string
    zul_ende: Date
    zul_erstmalig_am: Date
  }[]
}

export interface Psm {
  id: string
  name: string
  formula: string
  firstApprovedAt: Date
  lastApprovedAt: Date
}
