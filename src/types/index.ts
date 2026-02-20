export interface Initiative {
  id: string
  title: string
  description: string
  status: 'aktiv' | 'utvikling' | 'konsept' | 'lansert'
  category: string
}

export interface Capability {
  icon: string
  title: string
  description: string
}

export interface Principle {
  title: string
  description: string
}

export type RevealVariant = 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scaleIn' | 'stagger'
