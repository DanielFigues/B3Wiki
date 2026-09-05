import type { Article, WikiConfig } from '../types/index'

export const STORAGE_KEYS = {
  articles: 'articles',
  config: 'config',
} as const

export const seedConfig: WikiConfig = {
  name: 'B3Wiki',
  tagline: 'A enciclopédia da comunidade.',
  categories: [
    {
      title: 'Principal',
      links: [
        { slug: 'inicio', title: 'Início', url: '/' },
        { slug: 'exemplo', title: 'Artigo de exemplo', url: '/wiki/exemplo' },
      ],
    },
    {
      title: 'Comunidade',
      links: [
        { slug: 'regras', title: 'Regras', url: '/wiki/regras' },
        { slug: 'membros', title: 'Membros', url: '/wiki/membros' },
      ],
    },
  ],
}

export const seedArticles: Record<string, Article> = {
  exemplo: {
    id: 'exemplo',
    slug: 'exemplo',
    title: 'Artigo de exemplo',
    summary: 'Um artigo demonstrando o Markdown e a infobox.',
    content:
      '# Olá!\n\nEste é um artigo de **exemplo** para mostrar como o Markdown é renderizado.\n\n- Item de lista um\n- Item de lista dois\n\n> Uma citação para completar.',
    categories: ['Principal'],
    updatedAt: '2026-09-01T00:00:00.000Z',
    infobox: {
      title: 'Artigo de exemplo',
      fields: [
        { label: 'Categoria', value: 'Principal' },
        { label: 'Última atualização', value: '2026-09-01' },
      ],
    },
  },
  regras: {
    id: 'regras',
    slug: 'regras',
    title: 'Regras',
    summary: 'As regras da comunidade.',
    content: '# Regras\n\n- Respeite todos os membros.\n- Sem spam nem flood.\n- Divirta-se!',
    categories: ['Comunidade'],
    updatedAt: '2026-09-02T00:00:00.000Z',
    infobox: {
      title: 'Regras',
      fields: [{ label: 'Categoria', value: 'Comunidade' }],
    },
  },
  membros: {
    id: 'membros',
    slug: 'membros',
    title: 'Membros',
    summary: 'Conheça as pessoas que fazem parte do servidor.',
    content: '# Membros\n\nLista dos membros mais ativos da comunidade.',
    categories: ['Comunidade'],
    updatedAt: '2026-09-03T00:00:00.000Z',
  },
}