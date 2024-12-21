export interface Code {
  code: string
  codeList: number
  language: string
  value: string
  lock: string
}

export interface Psm {
  id: string
  name: string
  formula: string
  firstApprovedAt: Date
  lastApprovedAt: Date
}

export interface ActiveAgent {
  id: string
  name: string
  category: string
  approved: Date
}

export interface PsmScope {
  psmId: string
  scope: string
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

export interface HazardNote {
  psmId: string
  note: string
}

export interface SafetyNote {
  psmId: string
  note: string
}

export interface SignalWord {
  psmId: string
  signal: string
}
