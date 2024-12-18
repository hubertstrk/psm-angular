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
  id: string
  name: string
  category: string
  approved: Date
}

export interface PsmActiveAgentQueryyResult {
  items: [
    {
      gehalt_bio: 0
      gehalt_bio_einheit: 'string'
      gehalt_einheit: 'string'
      gehalt_rein: 0
      gehalt_rein_grundstruktur: 0
      kennr: 'string'
      wirknr: 'string'
      wirkvar: 'string'
    },
  ]
}

export interface PsmActiveAgent {
  bioContent: number
  bioContentUnit: string
  contentUnit: string
  pureContent: number
  pureContentBaseStructure: number
  psmId: string
  activeAgentId: string
  activeAgentVariant: string
}
