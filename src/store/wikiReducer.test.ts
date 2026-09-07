import { describe, expect, it } from 'vitest'
import { wikiReducer } from './wikiReducer'
import type { WikiState } from './wikiReducer'
import type { Article, WikiConfig } from '../types/index'

const baseArticle: Article = {
  id: 'a',
  slug: 'a',
  title: 'A',
  summary: '',
  content: '',
  categories: [],
  updatedAt: '2026-09-01T00:00:00.000Z',
}

const config: WikiConfig = {
  name: 'B3Wiki',
  tagline: '',
  categories: [{ title: 'Principal', links: [] }],
}

function makeState(articles: Record<string, Article> = {}): WikiState {
  return { config, articles }
}

describe('wikiReducer', () => {
  it('SEED substitui o estado', () => {
    const state = makeState({ a: baseArticle })
    const next = wikiReducer(state, {
      type: 'SEED',
      config,
      articles: { b: { ...baseArticle, slug: 'b', id: 'b' } },
    })
    expect(next.articles).toEqual({ b: expect.any(Object) })
    expect(next.articles.a).toBeUndefined()
  })

  it('UPSERT cria um artigo novo', () => {
    const next = wikiReducer(makeState(), {
      type: 'UPSERT_ARTICLE',
      article: baseArticle,
    })
    expect(next.articles.a).toEqual(baseArticle)
  })

  it('UPSERT atualiza um artigo existente', () => {
    const next = wikiReducer(makeState({ a: baseArticle }), {
      type: 'UPSERT_ARTICLE',
      article: { ...baseArticle, title: 'Novo' },
    })
    expect(next.articles.a.title).toBe('Novo')
    expect(Object.keys(next.articles)).toHaveLength(1)
  })

  it('DELETE remove o artigo', () => {
    const state = makeState({
      a: baseArticle,
      b: { ...baseArticle, id: 'b', slug: 'b' },
    })
    const next = wikiReducer(state, { type: 'DELETE_ARTICLE', slug: 'a' })
    expect(next.articles.a).toBeUndefined()
    expect(next.articles.b).toBeDefined()
  })
})