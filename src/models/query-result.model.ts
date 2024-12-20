export interface CodeQueryResult {
  items: {
    kode: string
    kodeliste: number
    sprache: string
    kodetext: string
    sperre: string
  }[]
}

export interface PsmScopeQueryResult {
  items: {
    kennr: string
    wirkungsbereich: string
  }[]
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

export interface ActiveAgentQueryResult {
  items: {
    wirknr: string
    wirkstoffname: string
    kategorie: string
    genehmigt: string
  }[]
}

export interface PsmActiveAgentQueryResult {
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

export interface HazardNoteQueryResult {
  items: {
    kennr: string
    gefahrenhinweis: string
  }[]
}

export interface SafetyNoteQueryResult {
  items: {
    kennr: string
    sicherheitshinweis: string
  }[]
}

export interface SignalWordQueryResult {
  items: {
    kennr: string
    signalwort: string
  }[]
}

export interface PackagingQueryResult {
  items: [
    {
      anzahl: string
      inhalt_einheit: string
      kennr: string
      menge: string
      verpackungsart: string
      verpackungsmaterial: string
    },
  ]
}
