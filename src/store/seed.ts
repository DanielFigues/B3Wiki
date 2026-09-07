import type { Article, WikiConfig } from '../types/index'

export const SEED_VERSION = 4

export const STORAGE_KEYS = {
  articles: 'articles',
  config: 'config',
  seedVersion: 'seedVersion',
} as const

export const seedConfig: WikiConfig = {
  name: 'B3Wiki',
  tagline: 'A enciclopédia da comunidade.',
  description:
    'Bem-vindo ao B3Wiki — uma enciclopédia aberta construída pela comunidade. Aqui você encontra guias, referências e curiosidades organizadas por categorias. Explore os artigos recentes, busque por um tema ou contribua criando uma nova página.',
  featured: ['introducao', 'react', 'como-editar'],
  categories: [
    {
      title: 'Principal',
      links: [
        { slug: 'inicio', title: 'Início', url: '/' },
        { slug: 'introducao', title: 'Introdução', url: '/wiki/introducao' },
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
    {
      title: 'Guias',
      links: [
        { slug: 'como-editar', title: 'Como editar um artigo', url: '/wiki/como-editar' },
        { slug: 'guia-markdown', title: 'Guia de Markdown', url: '/wiki/guia-markdown' },
      ],
    },
    {
      title: 'Tecnologia',
      links: [
        { slug: 'react', title: 'React para wikis', url: '/wiki/react' },
        { slug: 'vite', title: 'Vite: build moderno', url: '/wiki/vite' },
        { slug: 'typescript', title: 'TypeScript na prática', url: '/wiki/typescript' },
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
  introducao: {
    id: 'introducao',
    slug: 'introducao',
    title: 'Introdução ao B3Wiki',
    summary: 'Um guia rápido de navegação, busca e criação de artigos na wiki.',
    content:
      '# Bem-vindo ao B3Wiki\n\nEsta wiki é mantida pela própria comunidade.\n\n## O que você encontra aqui\n\n- **Artigos** com conteúdo colaborativo\n- **Categorias** para organizar tudo\n- **Editor** para criar e editar páginas\n\nLeia como **editar um artigo** para contribuir.',
    categories: ['Principal'],
    updatedAt: '2026-09-05T00:00:00.000Z',
    infobox: {
      title: 'Introdução ao B3Wiki',
      fields: [
        { label: 'Categoria', value: 'Principal' },
        { label: 'Última atualização', value: '2026-09-05' },
      ],
    },
  },
  'como-editar': {
    id: 'como-editar',
    slug: 'como-editar',
    title: 'Como editar um artigo',
    summary: 'Passo a passo para criar e editar páginas com o editor da wiki.',
    content:
      '# Como editar um artigo\n\n1. Acesse o **editor** pelo menu.\n2. Preencha título, resumo e conteúdo em **Markdown**.\n3. Escolha as **categorias**.\n4. Salve — o artigo aparece na página inicial.\n\n> Dica: use o **Guia de Markdown** para formatar seu texto.',
    categories: ['Guias'],
    updatedAt: '2026-09-04T00:00:00.000Z',
    infobox: {
      title: 'Como editar um artigo',
      fields: [{ label: 'Categoria', value: 'Guias' }],
    },
  },
  'guia-markdown': {
    id: 'guia-markdown',
    slug: 'guia-markdown',
    title: 'Guia de Markdown',
    summary: 'Títulos, listas, links, citações e mais na sintaxe Markdown.',
    content:
      '# Guia de Markdown\n\n## Títulos\n\nUse `#` para títulos de níveis diferentes.\n\n## Listas\n\n- Item com `-`\n- Outro item\n\n## Destaques\n\n**negrito**, _itálico_, `código`.\n\n## Citações\n\n> Uma citação para destacar conteúdo.',
    categories: ['Guias'],
    updatedAt: '2026-09-04T00:00:00.000Z',
    infobox: {
      title: 'Guia de Markdown',
      fields: [{ label: 'Categoria', value: 'Guias' }],
    },
  },
  react: {
    id: 'react',
    slug: 'react',
    title: 'React para wikis',
    summary: 'Por que React faz sentido para construir wikis rápidas e interativas.',
    content:
      '# React para wikis\n\nReact permite interfaces **reativas** com um estado claro.\n\n## Vantagens\n\n- Componentes reutilizáveis\n- Atualizações rápidas\n- Ecossistema enorme\n\nCombine com **Vite** e **TypeScript** para uma base sólida.',
    categories: ['Tecnologia'],
    updatedAt: '2026-09-05T00:00:00.000Z',
    infobox: {
      title: 'React para wikis',
      fields: [
        { label: 'Categoria', value: 'Tecnologia' },
        { label: 'Última atualização', value: '2026-09-05' },
      ],
    },
  },
  vite: {
    id: 'vite',
    slug: 'vite',
    title: 'Vite: build moderno',
    summary: 'Hot reload instantâneo e builds rápidos com o Vite.',
    content:
      '# Vite: build moderno\n\nO **Vite** traz dev server veloz e build otimizado.\n\n- Hot module replacement instantâneo\n- Configuração mínima\n- Suporte nativo a TypeScript e CSS\n\nIdeal para projetos React modernos.',
    categories: ['Tecnologia'],
    updatedAt: '2026-09-05T00:00:00.000Z',
  },
  typescript: {
    id: 'typescript',
    slug: 'typescript',
    title: 'TypeScript na prática',
    summary: 'Tipos que pegam erros antes do runtime e tornam o código mais seguro.',
    content:
      '# TypeScript na prática\n\nTypeScript adiciona **tipos estáticos** ao JavaScript.\n\n## Exemplo\n\n```ts\ninterface Article {\n  id: string\n  title: string\n}\n```\n\nIsso previne erros em refatorações e melhora o autocomplete.',
    categories: ['Tecnologia'],
    updatedAt: '2026-09-05T00:00:00.000Z',
  },
}