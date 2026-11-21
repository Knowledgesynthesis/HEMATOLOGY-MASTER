import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { safeStorage } from './storage'

export interface QStat {
  /** attempts */
  a: number
  /** correct */
  c: number
  /** last attempt correct */
  last: boolean
  /** last seen (ms) */
  t: number
}

interface ProgressState {
  learned: Record<string, number>
  questions: Record<string, QStat>
  cases: Record<string, { score: number; total: number; t: number }>
  toggleLearned: (key: string) => void
  recordAnswer: (qid: string, correct: boolean) => void
  recordCase: (id: string, score: number, total: number) => void
  reset: () => void
}

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      learned: {},
      questions: {},
      cases: {},
      toggleLearned: (key) =>
        set((s) => {
          const learned = { ...s.learned }
          if (learned[key]) delete learned[key]
          else learned[key] = Date.now()
          return { learned }
        }),
      recordAnswer: (qid, correct) =>
        set((s) => {
          const prev = s.questions[qid] ?? { a: 0, c: 0, last: false, t: 0 }
          return { questions: { ...s.questions, [qid]: { a: prev.a + 1, c: prev.c + (correct ? 1 : 0), last: correct, t: Date.now() } } }
        }),
      recordCase: (id, score, total) => set((s) => ({ cases: { ...s.cases, [id]: { score, total, t: Date.now() } } })),
      reset: () => set({ learned: {}, questions: {}, cases: {} }),
    }),
    { name: 'hm-progress', storage: safeStorage, version: 1 },
  ),
)

export const sectionKey = (moduleId: string, sectionId: string) => `${moduleId}#${sectionId}`
