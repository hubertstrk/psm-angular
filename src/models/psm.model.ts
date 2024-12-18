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
