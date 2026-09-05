import { useEffect, useMemo, useReducer } from 'react'
import type { ReactNode } from 'react'
import { WikiContext } from './wikiContext'
import { wikiReducer } from './wikiReducer'
import { seedArticles, seedConfig, STORAGE_KEYS } from './seed'
import { load, save } from './storage'

function createInitialState() {
  return {
    config: load(STORAGE_KEYS.config, seedConfig),
    articles: load(STORAGE_KEYS.articles, seedArticles),
  }
}

export function WikiProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wikiReducer, undefined, () => createInitialState())

  useEffect(() => {
    save(STORAGE_KEYS.config, state.config)
  }, [state.config])

  useEffect(() => {
    save(STORAGE_KEYS.articles, state.articles)
  }, [state.articles])

  const value = useMemo(() => ({ state, dispatch }), [state])

  return <WikiContext.Provider value={value}>{children}</WikiContext.Provider>
}