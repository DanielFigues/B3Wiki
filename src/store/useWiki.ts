import { useCallback, useContext } from 'react'
import { WikiContext } from './wikiContext'
import type { Article } from '../types/index'

export function useWiki() {
  const context = useContext(WikiContext)
  if (!context) {
    throw new Error('useWiki deve ser usado dentro de <WikiProvider>')
  }
  return context.state
}

export function useWikiActions() {
  const context = useContext(WikiContext)
  if (!context) {
    throw new Error('useWikiActions deve ser usado dentro de <WikiProvider>')
  }

  const upsertArticle = useCallback(
    (article: Article) => context.dispatch({ type: 'UPSERT_ARTICLE', article }),
    [context],
  )

  const deleteArticle = useCallback(
    (slug: string) => context.dispatch({ type: 'DELETE_ARTICLE', slug }),
    [context],
  )

  return { upsertArticle, deleteArticle }
}