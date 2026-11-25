import type { AppState } from '@/types'

/**
 * Persistance locale (LocalStorage) avec repli en mémoire.
 * L'interface `StorageAdapter` permet de brancher plus tard Supabase (synchronisation + authentification)
 * sans toucher au reste de l'application : il suffit de fournir un autre adaptateur dans `store.ts`.
 */
export interface StorageAdapter {
  load(): AppState | null
  save(state: AppState): void
  clear(): void
  readonly persistent: boolean
}

const KEY = 'cfc-revision:v1'

export const defaultState = (): AppState => ({
  version: 1,
  settings: {
    examDate: null,
    weeklyMinutes: 180,
    sessionLength: 30,
    theme: 'system',
    rounding: 'up',
    tp4Focus: 'les-deux',
  },
  lessons: {},
  selfMastery: {},
  ficheStatus: {},
  favorites: [],
  notes: {},
  freeNotes: [],
  cards: {},
  customCards: [],
  activity: [],
  exams: [],
  star: [],
  minutes: {},
  last: null,
  weekly: {},
  tp5Choice: { comps: [], pourquoi: '' },
})

/** Fusionne un état importé ou ancien avec les valeurs par défaut (tolérant aux champs manquants). */
export function hydrate(raw: unknown): AppState {
  const base = defaultState()
  if (!raw || typeof raw !== 'object') return base
  const r = raw as Partial<AppState>
  return {
    ...base,
    ...r,
    version: 1,
    // L'arrondi n'est plus un réglage : le guide CIFC (p. 31) fixe la demi-note supérieure.
    settings: { ...base.settings, ...(r.settings ?? {}), rounding: 'up' },
    favorites: Array.isArray(r.favorites) ? r.favorites : [],
    freeNotes: Array.isArray(r.freeNotes) ? r.freeNotes : [],
    customCards: Array.isArray(r.customCards) ? r.customCards : [],
    activity: Array.isArray(r.activity) ? r.activity : [],
    exams: Array.isArray(r.exams) ? r.exams : [],
    star: Array.isArray(r.star) ? r.star : [],
    tp5Choice: { comps: Array.isArray(r.tp5Choice?.comps) ? r.tp5Choice.comps.slice(0, 2) : [], pourquoi: typeof r.tp5Choice?.pourquoi === 'string' ? r.tp5Choice.pourquoi : '' },
  }
}

class LocalStorageAdapter implements StorageAdapter {
  private memory: AppState | null = null
  persistent = true

  constructor() {
    try {
      const k = '__cfc_test__'
      window.localStorage.setItem(k, '1')
      window.localStorage.removeItem(k)
    } catch {
      this.persistent = false
    }
  }

  load(): AppState | null {
    if (!this.persistent) return this.memory
    try {
      const raw = window.localStorage.getItem(KEY)
      return raw ? hydrate(JSON.parse(raw)) : null
    } catch {
      return this.memory
    }
  }

  save(state: AppState) {
    this.memory = state
    if (!this.persistent) return
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      this.persistent = false
    }
  }

  clear() {
    this.memory = null
    try {
      window.localStorage.removeItem(KEY)
    } catch {
      /* stockage indisponible */
    }
  }
}

export const storage: StorageAdapter = new LocalStorageAdapter()
