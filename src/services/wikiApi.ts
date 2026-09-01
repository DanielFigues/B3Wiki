import type { Article, WikiConfig } from '../types/index'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

export async function fetchWikiConfig(): Promise<WikiConfig> {
  const response = await fetch(`${API_BASE_URL}/config`)
  if (!response.ok) {
    throw new Error(`Failed to fetch wiki config: ${response.status}`)
  }
  return response.json()
}

export async function fetchArticle(slug: string): Promise<Article> {
  const response = await fetch(`${API_BASE_URL}/articles/${encodeURIComponent(slug)}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch article "${slug}": ${response.status}`)
  }
  return response.json()
}

export async function fetchArticles(): Promise<Article[]> {
  const response = await fetch(`${API_BASE_URL}/articles`)
  if (!response.ok) {
    throw new Error(`Failed to fetch articles: ${response.status}`)
  }
  return response.json()
}

export async function saveArticle(article: Article): Promise<Article> {
  const response = await fetch(
    `${API_BASE_URL}/articles/${encodeURIComponent(article.slug)}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(article),
    },
  )
  if (!response.ok) {
    throw new Error(`Failed to save article "${article.slug}": ${response.status}`)
  }
  return response.json()
}
