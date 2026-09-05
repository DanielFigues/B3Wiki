# B3Wiki — Design do MVP

**Data:** 2026-09-04
**Status:** aprovado em brainstorm

## Objetivo

B3Wiki é uma wiki da comunidade para um servidor do Discord, feita por diversão.
Este MVP entrega o **frontend only** (React 19 + Vite + TypeScript), com estilos
**100% Tailwind 4**, dados persistentes no **localStorage**, busca, listagem por
categoria e editor funcional. Não há backend, nem histórico de edições, nem
upload de imagens nesta iteração.

## Escopo

- Frontend-only, com dados de exemplo (seed) no primeiro uso.
- Migração completa do CSS customizado para classes utilitárias Tailwind 4.
- Persistência em `localStorage` (artigos + configuração).
- Busca de artigos em tempo real (título e conteúdo).
- Listagem de artigos por categoria.
- Editor funcional: criar/editar artigo (slug, título, resumo, categorias,
  Markdown com preview, infobox).
- UI em português.
- Testes unitários (Vitest + React Testing Library) para reducer e storage.

## Fora de escopo (próximas iterações)

- Backend/API real (o `services/wikiApi.ts` fica reservado para isso).
- Histórico de versões de edições.
- Upload de imagens.
- Toggle manual de dark mode (segue `prefers-color-scheme`).
- Autenticação/autorização.

## Arquitetura

Fonte única de verdade: **Context + Reducer** com persistência automática.

```
estado = {
  config: WikiConfig,                      // nome, tagline, categorias
  articles: Record<slug, Article>,         // indexado por slug
}
```

### Módulo `src/store/`

| Arquivo | Responsabilidade |
|---------|------------------|
| `storage.ts` | Helpers `load`/`save` com try/catch e fallback |
| `seed.ts` | Config e artigos iniciais em português |
| `wikiReducer.ts` | Reducer puro; ações `SEED`, `UPSERT_ARTICLE`, `DELETE_ARTICLE` |
| `WikiContext.tsx` | `WikiProvider` (lazy load + seed + `useEffect` persistente) e hooks `useWiki()` / `useWikiActions()` |

### Tipos

- `Article`: `{ id, slug, title, summary, content, categories: string[], updatedAt }`
- `WikiConfig`: `{ name, tagline, categories: SidebarCategory[] }`
- Mantidos os tipos já existentes em `src/types/index.ts`.
- O campo `id` permanece no tipo (compatibilidade futura com API), mas o **estado
  e as ações usam `slug` como chave** — `id` fica igual ao `slug` nos dados seed.

## Fluxo de dados

1. `WikiProvider` envolve o app; ao montar, carrega do `localStorage`
   (chaves `b3wiki:articles`, `b3wiki:config`). Se vazio → `SEED` e persiste.
2. Reducer é puro; um `useEffect` no provider grava o estado a cada mudança.
3. Páginas e componentes **nunca** acessam o `localStorage` diretamente —
   somente leitura via context e ações via `useWikiActions()`.
4. `services/wikiApi.ts` sai do caminho por ora; o futuro backend apenas
   substitui o provider por um que busca na API, mantendo a interface.

## Rotas e páginas (PT-BR)

`App.tsx` aninha tudo dentro de `<WikiProvider>`:

| Rota | Página | Função |
|------|--------|--------|
| `/` | Início | Hero, busca, artigos recentes, categorias do config |
| `/wiki/:slug` | Artigo | Conteúdo Markdown + infobox; not-found com CTA de criação |
| `/categoria/:categoria` | Categoria | Lista artigos da categoria |
| `/busca?q=` | Busca | Filtra por título/conteúdo em tempo real |
| `/editor?slug=` | Editor | Criar/editar; salva via `UPSERT_ARTICLE` |

## Componentes

Reescritos em Tailwind (barrel `index.ts` mantido):

- **Header** — logo, `SearchBar`, link "Artigo aleatório"
- **SearchBar** (novo) — input com debounce que navega para `/busca?q=...`
- **Sidebar** — categorias vindas do context (não mais prop estática)
- **Layout** — header + sidebar + `<Outlet/>`
- **Infobox** — título, imagem opcional, campos label/value

## Design visual (Tailwind 4)

- `@import "tailwindcss"` e tokens em `@theme` no `src/index.css`:
  cores `accent`, `primary`, `bg`, `surface`, `border`, `muted`, `code`;
  fontes `sans`/`mono`.
- Dark mode via `@custom-variant dark` + `@media (prefers-color-scheme: dark)`.
- Remove-se `src/App.css` (estilos legados do template) e todo CSS customizado
  por arquivo.
- Layout ao estilo wiki: header no topo, sidebar à esquerda, conteúdo central,
  infobox flutuando à direita nos artigos.

## Tratamento de erros

- Artigo inexistente em `/wiki/:slug` → mensagem amigável + link para criar.
- `localStorage` indisponível ou corrompido → fallback para o seed, sem crash.
- Editor valida slug (não-vazio, sem espaços/acentos) antes de salvar.

## Testes (Vitest)

- `src/store/wikiReducer.test.ts` — seed, upsert (criar/atualizar), delete.
- `src/store/storage.test.ts` — load/save e fallback em dados corrompidos.
- Scripts `test` e `test:watch` no `package.json`.
- Config Vitest + jsdom embutida no `vite.config.ts`.

## Verificação de conclusão

- `npm run lint` sem erros (oxlint).
- `npm run test` verde.
- `npm run build` sem erros (tsc + vite build).
- `npm run dev` validado no browser.