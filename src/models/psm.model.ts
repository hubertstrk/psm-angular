export interface CodeQueryResult {
  items: {
    kode: string
    kodeliste: number
    sprache: string
    kodetext: string
    sperre: string
  }[]
}

export interface Code {
  code: string
  codeList: number
  language: string
  value: string
  lock: string
}

export interface PsmScopeQueryResult {
  items: {
    kennr: string
    wirkungsbereich: string
  }[]
}

export interface PsmScope {
  psmId: string
  scope: string
}

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

export interface ActiveAgentQueryResult {
  items: {
    wirknr: string
    wirkstoffname: string
    kategorie: string
    genehmigt: string
  }[]
}

export interface ActiveAgent {
  number: string
  name: string
  category: string
  approved: Date
}
