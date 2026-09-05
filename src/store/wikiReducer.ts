import type { Article, WikiConfig } from '../types/index'

export interface WikiState {
  config: WikiConfig
  articles: Record<string, Article>
}

export type WikiAction =
  | { type: 'SEED'; config: WikiConfig; articles: Record<string, Article> }
  | { type: 'UPSERT_ARTICLE'; article: Article }
  | { type: 'DELETE_ARTICLE'; slug: string }

export function wikiReducer(state: WikiState, action: WikiAction): WikiState {
  switch (action.type) {
    case 'SEED':
      return { config: action.config, articles: { ...action.articles } }

    case 'UPSERT_ARTICLE':
      return {
        ...state,
        articles: { ...state.articles, [action.article.slug]: action.article },
      }

    case 'DELETE_ARTICLE': {
      const articles = { ...state.articles }
      delete articles[action.slug]
      return { ...state, articles }
    }
  }
}