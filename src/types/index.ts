export interface Article {
  id: string
  slug: string
  title: string
  summary: string
  content: string
  categories: string[]
  updatedAt: string
  infobox?: InfoboxData
}

export interface ArticleLink {
  slug: string
  title: string
  url: string
}

export interface InfoboxField {
  label: string
  value: string
  href?: string
}

export interface InfoboxData {
  title: string
  imageUrl?: string
  caption?: string
  fields: InfoboxField[]
}

export interface SidebarCategory {
  title: string
  links: ArticleLink[]
}

export interface WikiConfig {
  name: string
  tagline: string
  categories: SidebarCategory[]
}
