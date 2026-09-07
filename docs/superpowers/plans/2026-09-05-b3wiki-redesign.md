# B3Wiki Redesign (ReactBits) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign visual do B3Wiki em "dark-first vibrante", com ReactBits em 3 camadas (fundo global sutil de Particles, hero animado na Home, micro-interações de sparkle), respeitando `prefers-reduced-motion` e sem poluição.

**Architecture:** Manter 100% do modelo de dados e rotas atuais; trocar apenas a camada visual. Componentes ReactBits (variante TS-TW, abertos) são copiados da fonte oficial para `src/components/reactbits/` e usados por wrappers próprios (`AnimatedBackground`, hook `useReducedMotion`). Tema refeito dark-first em `src/index.css`, com variante clara re-tuneada.

**Tech Stack:** React 19.2.8, Vite 8, Tailwind 4 (`@theme` tokens), TS 6 (verbatimModuleSyntax), react-router 7, oxlint, Vitest 5. Deps novas: `gsap`, `@gsap/react`, `motion`, `ogl`, `@fontsource-variable/space-grotesk`.

**Spec:** `docs/superpowers/specs/2026-09-05-b3wiki-redesign-design.md` (design aprovado; este plano argumenta a partir dela — executores devem ler a spec junto).

## Global Constraints

- Dark-first: tokens do `@theme` são a paleta escura; a clara vem de `@media (prefers-color-scheme: light)` re-tuneada (valores na spec).
- Display = Space Grotesk (variável, via fontsource, self-hosted); corpo = fonte atual (`--font-sans`).
- `prefers-reduced-motion` OBRIGATÓRIO: o hook `useReducedMotion()` desliga Particle/hero/reveals/magnets; CSS global reduz transições/durações.
- ReactBits: somente open source, variante **TS-TW**, em `src/components/reactbits/<Categoria>/<Nome>/`. Sem Pro; sem `three`/R3F (`ogl` apenas no fundo).
- `Editor` e `Sidebar` inalterados no código (herdam só tokens). `index.html` intocado.
- Copy da UI em PT-BR.
- `verbatimModuleSyntax` ativo → usar `import type` para tipos. `tsconfig.app.json` ganha `"allowSyntheticDefaultImports": true` (Task 2; os sources de ReactBits usam `import React from 'react'`).
- oxlint: zero erros novos; warnings já existentes no `Editor.tsx` (set-state-in-effect, exhaustive-deps) permanecem aceitos.
- Testes: os 13 existentes continuam verdes; a Task 2 acrescenta 3 (hook `useReducedMotion`). Total final: 16.
- Build obrigatório antes de cada commit: `npm run build` (roda `tsc -b` + vite). `npm run lint` e `npm run test` também verdes.
- Ambiente: Windows/PowerShell — sem `bash`, sem `&&`; encadear com `; if ($?) { ... }`. UTF-8 em programas de extração (irrelevante aqui, só arquivos puros).
- Mensagens de commit: convencional PT-BR (`feat:`, `style:`, `chore:`, `docs:`), uma linha.
- Fontes dos componentes: `raw.githubusercontent.com/DavidHDev/react-bits/main/src/ts-tailwind/<Categoria>/<Nome>/<Nome>.tsx` (mesmos bytes da instalação `jsrepo`/shadcn TS-TW).

---

### Task 1: Fundação visual (tema dark-first + fonte + base)

**Files:**
- Modify: `src/index.css` (substituir por completo)
- Modify: `src/main.tsx` (import da fonte)
- Package: `npm install @fontsource-variable/space-grotesk`

**Interfaces:**
- Consumes: nada (fundo do layout atual).
- Produces: tokens `--color-*` (paper/surface/line/ink/ink-muted/ink-heading/accent/accent-contrast/accent-2/accent-soft/glow/code), `--font-display`, classes `.text-gradient-animated` e `.hero-dark`, bloco global `@media (prefers-reduced-motion)` em `src/index.css`.

- [x] **Step 1: Instalar a fonte display**

Run: `npm install @fontsource-variable/space-grotesk`
Expected: exit 0; `@fontsource-variable/space-grotesk` aparece em `package.json` dependencies.

- [x] **Step 2: Registrar a fonte em `main.tsx`**

Adicionar o import de efeito ANTES de `import './index.css'`:

```ts
import '@fontsource-variable/space-grotesk'
import './index.css'
```

- [x] **Step 3: Reescrever `src/index.css`**

```css
@import "tailwindcss";

@theme {
  --font-sans: system-ui, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
  --font-mono: ui-monospace, Consolas, "Courier New", monospace;
  --font-display: "Space Grotesk Variable", system-ui, "Segoe UI", Roboto, sans-serif;

  --color-paper: #0b0e14;
  --color-surface: #141824;
  --color-line: #232a3b;
  --color-ink: #d7dbe4;
  --color-ink-muted: #8a93a8;
  --color-ink-heading: #f5f7fb;
  --color-accent: #8b5cf6;
  --color-accent-contrast: #ffffff;
  --color-accent-2: #ff7a5c;
  --color-accent-soft: rgba(139, 92, 246, 0.14);
  --color-glow: rgba(139, 92, 246, 0.25);
  --color-code: #151a26;
}

@media (prefers-color-scheme: light) {
  :root {
    --color-paper: #f8f9fc;
    --color-surface: #ffffff;
    --color-line: #e3e6ee;
    --color-ink: #23262e;
    --color-ink-muted: #5b6172;
    --color-ink-heading: #0f1117;
    --color-accent: #7c3aed;
    --color-accent-2: #e8593a;
    --color-accent-soft: rgba(124, 58, 237, 0.1);
    --color-glow: rgba(124, 58, 237, 0.22);
    --color-code: #eef1f7;
  }

  .hero-dark {
    background-color: #0b0e14;
  }
}

@layer base {
  body {
    @apply bg-paper font-sans text-ink;
    min-width: 320px;
  }

  a {
    @apply text-accent;
  }

  h1,
  h2,
  h3,
  h4 {
    @apply font-semibold text-ink-heading;
    font-family: var(--font-display);
    line-height: 1.15;
  }
}

@layer components {
  .text-gradient-animated {
    background-image: linear-gradient(
      90deg,
      var(--color-accent),
      var(--color-accent-2),
      var(--color-accent)
    );
    background-size: 200% auto;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    animation: text-gradient-shift 6s linear infinite;
  }

  @keyframes text-gradient-shift {
    to {
      background-position: 200% center;
    }
  }

  .hero-dark {
    background-color: #0b0e14;
    background-image: radial-gradient(
        1000px 480px at 50% -10%,
        var(--color-glow),
        transparent 65%
      ),
      radial-gradient(700px 360px at 85% 115%, rgba(255, 122, 92, 0.1), transparent 60%);
    border: 1px solid rgb(255 255 255 / 0.08);
    border-radius: 1.25rem;
  }

  .markdown > :first-child {
    margin-top: 0;
  }

  .markdown h1,
  .markdown h2,
  .markdown h3 {
    @apply mb-2 mt-6 font-semibold text-ink-heading;
  }

  .markdown h1 {
    @apply text-2xl;
  }

  .markdown h2 {
    @apply text-xl;
  }

  .markdown h3 {
    @apply text-lg;
  }

  .markdown p {
    @apply mb-3;
  }

  .markdown ul {
    @apply mb-3 list-disc pl-6;
  }

  .markdown ol {
    @apply mb-3 list-decimal pl-6;
  }

  .markdown blockquote {
    @apply mb-3 border-l-4 border-line pl-4 text-ink-muted;
  }

  .markdown code {
    @apply rounded bg-code px-1 py-0.5 font-mono text-sm;
  }

  .markdown pre {
    @apply mb-3 overflow-x-auto rounded border border-line bg-code p-3;
  }

  .markdown pre code {
    @apply bg-transparent p-0;
  }

  .markdown a {
    @apply text-accent hover:underline;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [x] **Step 4: Verificar build e lint**

Run: `npm run build`
Expected: exit 0, sem erros do tsc (o app inteiro agora usa os tokens dark-first).

Run: `npm run lint`
Expected: exit 0 (nenhum erro novo).

Run: `npm run test`
Expected: 13 pass (nenhum teste depende de cores/tokens).

- [x] **Step 5: Commit**

`git add src/index.css src/main.tsx package.json package-lock.json`
`git commit -m "style: tema dark-first vibrante com Space Grotesk"`

---

### Task 2: Infra ReactBits — hook useReducedMotion (TDD) + componentes

**Files:**
- Create: `src/hooks/useReducedMotion.ts`, `src/hooks/useReducedMotion.test.ts`
- Create (cópia): `src/components/reactbits/Backgrounds/Particles/Particles.tsx`, `src/components/reactbits/TextAnimations/SplitText/SplitText.tsx`, `src/components/reactbits/TextAnimations/BlurText/BlurText.tsx`, `src/components/reactbits/TextAnimations/CountUp/CountUp.tsx`, `src/components/reactbits/TextAnimations/ShinyText/ShinyText.tsx`, `src/components/reactbits/Animations/Magnet/Magnet.tsx`, `src/components/reactbits/Animations/FadeContent/FadeContent.tsx`, `src/components/reactbits/Components/SpotlightCard/SpotlightCard.tsx`
- Modify: `tsconfig.app.json` (+`allowSyntheticDefaultImports`), `package.json` (deps novas), `src/components/reactbits/Components/SpotlightCard/SpotlightCard.tsx` (classes do container)

**Interfaces:**
- Consumes: nada.
- Produces:
  - `useReducedMotion(): boolean` (hook que segue `(prefers-reduced-motion: reduce)` via `matchMedia` + listener `change`).
  - Componentes importáveis por caminho: `../components/reactbits/Backgrounds/Particles/Particles` (default `Particles`), `../components/reactbits/TextAnimations/SplitText/SplitText`, `BlurText/BlurText`, `CountUp/CountUp`, `ShinyText/ShinyText`, `../components/reactbits/Animations/Magnet/Magnet`, `../components/reactbits/Animations/FadeContent/FadeContent`, `../components/reactbits/Components/SpotlightCard/SpotlightCard`.
  - `AnimatedBackground` (Task 3) usará `Particles` e `useReducedMotion`.

- [x] **Step 1: Instalar dependências**

Run: `npm install gsap @gsap/react motion ogl`
Expected: exit 0. (Particles→ogl; SplitText/FadeContent→gsap+@gsap/react; BlurText/CountUp/ShinyText→motion; SpotlightCard/Magnet não precisam.)

- [x] **Step 2: Habilitar default-import de React no tsc**

Em `tsconfig.app.json`, dentro de `compilerOptions`, adicionar:

```json
    "allowSyntheticDefaultImports": true,
```

- [x] **Step 3: Copiar os 8 componentes da fonte oficial (TS-TW)**

Para cada componente, criar a pasta e baixar o `.tsx` do `main` (PowerShell):

```
New-Item -ItemType Directory -Force -Path "src/components/reactbits/Backgrounds/Particles" | Out-Null
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/ts-tailwind/Backgrounds/Particles/Particles.tsx" -OutFile "src/components/reactbits/Backgrounds/Particles/Particles.tsx"
```

Repetir o mesmo padrão para os demais (URI base `https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/ts-tailwind/`):

| Destino | Caminho do raw |
|---|---|
| `src/components/reactbits/TextAnimations/SplitText/SplitText.tsx` | `TextAnimations/SplitText/SplitText.tsx` |
| `src/components/reactbits/TextAnimations/BlurText/BlurText.tsx` | `TextAnimations/BlurText/BlurText.tsx` |
| `src/components/reactbits/TextAnimations/CountUp/CountUp.tsx` | `TextAnimations/CountUp/CountUp.tsx` |
| `src/components/reactbits/TextAnimations/ShinyText/ShinyText.tsx` | `TextAnimations/ShinyText/ShinyText.tsx` |
| `src/components/reactbits/Animations/Magnet/Magnet.tsx` | `Animations/Magnet/Magnet.tsx` |
| `src/components/reactbits/Animations/FadeContent/FadeContent.tsx` | `Animations/FadeContent/FadeContent.tsx` |
| `src/components/reactbits/Components/SpotlightCard/SpotlightCard.tsx` | `Components/SpotlightCard/SpotlightCard.tsx` |

Expected: 8 arquivos presentes. NÃO editar o conteúdo interno (exceto o ajuste do SpotlightCard no passo 4). Se algum raw falhar, pesquisa a fonte em `main` novamente (pode ter sido renomeada no upstream).

- [x] **Step 4: Ajustar as classes-base e o gating de reduced-motion do SpotlightCard**

No arquivo copiado `src/components/reactbits/Components/SpotlightCard/SpotlightCard.tsx`:

1. Substituir a string de classes do container:

```tsx
      className={`relative rounded-3xl border border-neutral-800 bg-neutral-900 overflow-hidden p-8 ${className}`}
```

por:

```tsx
      className={`relative overflow-hidden rounded-2xl border border-line bg-surface ${className}`}
```

(mantém `${className}` no fim; os consumidores definem espaçamento próprio.)

2. Adicionar o helper e guardar os handlers de hover contra `prefers-reduced-motion` (o brilho de focus/keyboard continua ligado — é indicação acessível, não movimento). Fica assim a parte dos handlers:

```tsx
  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = e => {
    if (prefersReducedMotion()) return
    if (!divRef.current || isFocused) return

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.6);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    if (prefersReducedMotion()) return
    setOpacity(0.6);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };
```

NÃO mexer em mais nada do arquivo (o restante do markup/tipos permanece como veio da fonte).

- [x] **Step 5: Escrever o teste do hook (deve falhar)**

Criar `src/hooks/useReducedMotion.test.ts`:

```ts
import { act } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useReducedMotion } from './useReducedMotion'

function createFakeMql(initialMatches: boolean) {
  const listeners = new Set<() => void>()
  const mql = {
    matches: initialMatches,
    addEventListener: (_type: string, cb: () => void) => listeners.add(cb),
    removeEventListener: (_type: string, cb: () => void) => listeners.delete(cb),
  }
  return {
    mql,
    fire: (matches: boolean) => {
      mql.matches = matches
      listeners.forEach((cb) => cb())
    },
  }
}

describe('useReducedMotion', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('retorna true quando o sistema pede menos movimento', () => {
    const { mql } = createFakeMql(true)
    vi.stubGlobal('matchMedia', vi.fn(() => mql))
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(true)
  })

  it('retorna false quando a animação está liberada', () => {
    const { mql } = createFakeMql(false)
    vi.stubGlobal('matchMedia', vi.fn(() => mql))
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(false)
  })

  it('atualiza quando a preferência muda no meio da sessão', () => {
    const { mql, fire } = createFakeMql(false)
    vi.stubGlobal('matchMedia', vi.fn(() => mql))
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(false)
    act(() => fire(true))
    expect(result.current).toBe(true)
    act(() => fire(false))
    expect(result.current).toBe(false)
  })
})
```

O requisito mínimo são os 2 primeiros casos + a atualização (3º). Garanta que ao final cada teste limpe o global (`vi.unstubAllGlobals()`).

- [x] **Step 6: Rodar o teste e ver falhar (hook não existe)**

Run: `npx vitest run src/hooks/useReducedMotion.test.ts`
Expected: FAIL (module `./useReducedMotion` não resolvido/`useReducedMotion is not a function`).

- [x] **Step 7: Implementar o hook**

Criar `src/hooks/useReducedMotion.ts`:

```ts
import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => window.matchMedia(QUERY).matches)

  useEffect(() => {
    const mql = window.matchMedia(QUERY)
    const onChange = () => setReduced(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return reduced
}
```

- [x] **Step 8: Rodar o teste e ver passar**

Run: `npx vitest run src/hooks/useReducedMotion.test.ts`
Expected: PASS (3 itens).

- [x] **Step 9: Verificar suite completa, lint e build**

Run: `npm run test` → 16 pass (13 antigos + 3 novos).
Run: `npm run lint` → exit 0 (sem erros novos; comentários `eslint-disable` dentro dos componentes copiados são ignorados pelo oxlint).
Run: `npm run build` → exit 0 (`tsc -b` compila os novos componentes — o flag do passo 2 cobre os `import React from 'react'`).

- [x] **Step 10: Commit**

`git add src/components/reactbits src/hooks tsconfig.app.json package.json package-lock.json`
`git commit -m "feat: infra reactbits (particles, textos, cards) e hook de reduced-motion"`

---

### Task 3: Fundo global de Particles no Layout

**Files:**
- Create: `src/components/AnimatedBackground.tsx`
- Modify: `src/components/Layout.tsx`, `src/components/index.ts`

**Interfaces:**
- Consumes: `Particles` (default, props `particleCount?`, `particleSpread?`, `speed?`, `particleColors?`, `alphaParticles?`, `pixelRatio?`), `useReducedMotion`.
- Produces: `AnimatedBackground` (componente sem props; renderiza nada quando reduced-motion ou aba oculta) — consumido pelo `Layout`; exportado no barrel.

- [x] **Step 1: Criar `src/components/AnimatedBackground.tsx`**

```tsx
import { useEffect, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import Particles from './reactbits/Backgrounds/Particles/Particles'

function AnimatedBackground() {
  const reduceMotion = useReducedMotion()
  const [tabVisible, setTabVisible] = useState(() => !document.hidden)

  useEffect(() => {
    const onChange = () => setTabVisible(!document.hidden)
    document.addEventListener('visibilitychange', onChange)
    return () => document.removeEventListener('visibilitychange', onChange)
  }, [])

  if (reduceMotion || !tabVisible) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 opacity-60">
      <Particles
        particleCount={80}
        particleSpread={20}
        speed={0.06}
        particleColors={['#8b5cf6', '#ff7a5c', '#ffffff']}
        alphaParticles
        pixelRatio={1}
        className="h-full w-full"
      />
    </div>
  )
}

export default AnimatedBackground
```

Nota: o componente Particles já cancela o `requestAnimationFrame` no unmount; sair da aba desmonta o canvas (gating `document.hidden`).

- [x] **Step 2: Montar no `Layout`**

Em `src/components/Layout.tsx`, importar e renderizar antes do wrapper de conteúdo:

```tsx
import { Outlet } from 'react-router-dom'
import AnimatedBackground from './AnimatedBackground'
import Header from './Header'
import Sidebar from './Sidebar'
import { useWiki } from '../store/index'

function Layout() {
  const { config } = useWiki()

return (
    <div className="relative isolate min-h-svh bg-paper font-sans text-ink">
      <AnimatedBackground />
      <Header siteName={config.name} />
      <div className="relative mx-auto flex max-w-6xl">
        <Sidebar />
        <main className="min-w-0 flex-1 px-6 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
```

O `<Header>` permanece em largura total (raiz do Layout, como no app atual) — a T3 apenas acrescenta `AnimatedBackground` e `isolate`. Movê-lo para dentro da linha `max-w-6xl` quebraria o layout da top bar (Ruling 5).

Observação: `-z-10` no painel fixo mantém o canvas ATRÁS do conteúdo (acima do fundo da página). O `relative` no root/wrappers garante empilhamento previsível.

- [x] **Step 3: Exportar no barrel**

Em `src/components/index.ts`:

```ts
export { default as AnimatedBackground } from './AnimatedBackground'
```

- [x] **Step 4: Verificar lint/build**

Run: `npm run lint` → exit 0.
Run: `npm run build` → exit 0.
Run: `npm run test` → 16 pass.

- [x] **Step 5: Commit**

`git add src/components/AnimatedBackground.tsx src/components/Layout.tsx src/components/index.ts`
`git commit -m "feat: fundo global de particles no layout"`

---

### Task 4: Hero da Home (SplitText + BlurText + CountUp + Magnet)

**Files:**
- Modify: `src/pages/Home.tsx`

**Interfaces:**
- Consumes: `useReducedMotion`, `SplitText`, `BlurText`, `CountUp`, `Magnet`; `config`/`articles` do `useWiki`.
- Produces: primeira seção da Home = hero com `class="hero-dark"`, âncora `id="artigos"` na seção de recentes (alvo de "Explorar wiki"); seções Categorias/Recentes ainda SEM spotlight (Task 5).

- [x] **Step 1: Reescrever a seção inicial da Home**

Em `src/pages/Home.tsx`, acrescentar os imports e substituir a primeira `<section>` por:

```tsx
import { Link } from 'react-router-dom'
import { useWiki } from '../store/index'
import { slugify } from '../utils/slug'
import { useReducedMotion } from '../hooks/useReducedMotion'
import SplitText from '../components/reactbits/TextAnimations/SplitText/SplitText'
import BlurText from '../components/reactbits/TextAnimations/BlurText/BlurText'
import CountUp from '../components/reactbits/TextAnimations/CountUp/CountUp'
import Magnet from '../components/reactbits/Animations/Magnet/Magnet'

function Home() {
  const { config, articles } = useWiki()
  const reduceMotion = useReducedMotion()

  const articleCount = Object.keys(articles).length
  const categoryCount = config.categories.length

  const recent = Object.values(articles)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 5)

  const ctaExplorar = (
    <a
      href="#artigos"
      className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-contrast hover:opacity-90"
    >
      Explorar wiki
    </a>
  )

  const ctaCriar = (
    <Link
      to="/editor"
      className="rounded-lg border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-ink hover:border-accent"
    >
      Criar artigo
    </Link>
  )

  return (
    <div className="space-y-10">
      <section className="hero-dark px-6 py-14 text-center sm:px-12 sm:py-20">
        {reduceMotion ? (
          <h1 className="text-4xl font-bold text-ink-heading sm:text-6xl">{config.name}</h1>
        ) : (
          <SplitText
            text={config.name}
            tag="h1"
            splitType="words, chars"
            delay={40}
            duration={1}
            className="text-gradient-animated text-4xl font-bold sm:text-6xl"
          />
        )}

        {reduceMotion ? (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-muted">{config.tagline}</p>
        ) : (
          <BlurText
            text={config.tagline}
            animateBy="words"
            delay={60}
            direction="top"
            className="mx-auto mt-4 max-w-2xl text-lg text-ink-muted"
          />
        )}

        <div className="mt-10 flex items-center justify-center gap-12">
          <div>
            <p className="text-3xl font-bold text-accent">
              {reduceMotion ? articleCount : <CountUp to={articleCount} duration={1.6} />}
            </p>
            <p className="text-sm text-ink-muted">artigos</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-accent-2">
              {reduceMotion ? categoryCount : <CountUp to={categoryCount} duration={1.6} />}
            </p>
            <p className="text-sm text-ink-muted">categorias</p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {reduceMotion ? (
            <>
              {ctaExplorar}
              {ctaCriar}
            </>
          ) : (
            <>
              <Magnet magnetStrength={3}>{ctaExplorar}</Magnet>
              <Magnet magnetStrength={3}>{ctaCriar}</Magnet>
            </>
          )}
        </div>
      </section>

      {/* seções recentes/categorias permanecem como estão (Task 5) */}
```

- [x] **Step 2: Adicionar `id="artigos"` na seção de recentes**

Na `<section>` que contém "Artigos recentes", usar:

```tsx
<section id="artigos" className="scroll-mt-6">
```

- [x] **Step 3: Verificar lint/build/test**

Run: `npm run lint` → exit 0 (o JSX de Multi-line ternários com condicionais é aceito; se o oxlint reclamar de complexidade, extrair o bloco do hero para `HeroSection({ reduceMotion, ... })` local no arquivo).
Run: `npm run build` → exit 0.
Run: `npm run test` → 16 pass.

- [x] **Step 4: Commit**

`git add src/pages/Home.tsx`
`git commit -m "feat: hero animado da página inicial com gradiente e stats"`

---

### Task 5: Cards e reveals da Home (SpotlightCard + ShinyText + FadeContent)

**Files:**
- Modify: `src/pages/Home.tsx`

**Interfaces:**
- Consumes: `SpotlightCard`, `ShinyText`, `FadeContent` (e `reduceMotion` já existente).
- Produces: seções "Artigos recentes" em card-spotlight, "Categorias" em grid de spotlight-cards, títulos de seção com `ShinyText`, testes de reveal com `FadeContent`. Mantém os estados vazios PT-BR atuais.

- [x] **Step 1: Adicionar imports e const `ShinySectionTitle`**

Imports novos em `src/pages/Home.tsx`:

```tsx
import SpotlightCard from '../components/reactbits/Components/SpotlightCard/SpotlightCard'
import ShinyText from '../components/reactbits/TextAnimations/ShinyText/ShinyText'
import FadeContent from '../components/reactbits/Animations/FadeContent/FadeContent'
```

Helper de título de seção no escopo do módulo (fora de `Home` — o oxlint `react(static-components)` rejeita componente definido dentro de outro componente; Ruling 6):

```tsx
function SectionTitle({ reduceMotion, children }: { reduceMotion: boolean; children: string }) {
  return reduceMotion ? (
    <h2 className="text-xl font-semibold text-ink-heading">{children}</h2>
  ) : (
    <h2 className="text-xl font-semibold text-ink-heading">
      <ShinyText
        text={children}
        speed={3}
        delay={0.6}
        spread={100}
        color="var(--color-ink-heading)"
        shineColor="var(--color-accent)"
        pauseOnHover
      />
    </h2>
  )
}
```

Os pontos de uso passam a `<SectionTitle reduceMotion={reduceMotion}>…</SectionTitle>`.

- [x] **Step 2: Reescrever a seção "Artigos recentes"**

```tsx
<section id="artigos" className="scroll-mt-6">
  <SectionTitle reduceMotion={reduceMotion}>Artigos recentes</SectionTitle>
  {recent.length === 0 ? (
    <p className="text-ink-muted">Nenhum artigo ainda. Crie o primeiro no editor.</p>
  ) : reduceMotion ? (
    <ul className="mt-3 space-y-3">
      {recent.map((article) => (
        <li key={article.slug}>
          <Link to={`/wiki/${encodeURIComponent(article.slug)}`} className="block hover:no-underline">
            <SpotlightCard spotlightColor="rgba(139, 92, 246, 0.30)" className="p-4 text-left">
              <h3 className="font-semibold text-ink-heading">{article.title}</h3>
              <p className="mt-1 text-sm text-ink-muted">{article.summary}</p>
            </SpotlightCard>
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <FadeContent duration={700}>
      <ul className="mt-3 space-y-3">
        {recent.map((article) => (
          <li key={article.slug}>
            <Link to={`/wiki/${encodeURIComponent(article.slug)}`} className="block hover:no-underline">
              <SpotlightCard spotlightColor="rgba(139, 92, 246, 0.30)" className="p-4 text-left">
                <h3 className="font-semibold text-ink-heading">{article.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{article.summary}</p>
              </SpotlightCard>
            </Link>
          </li>
        ))}
      </ul>
    </FadeContent>
  )}
</section>
```

- [x] **Step 3: Reescrever a seção "Categorias"**

```tsx
<section>
  <SectionTitle reduceMotion={reduceMotion}>Categorias</SectionTitle>
  {reduceMotion ? (
    <div className="mt-3 grid gap-3 sm:grid-cols-2">
      {config.categories.map((category) => {
        const count = Object.values(articles).filter((article) =>
          article.categories.includes(category.title),
        ).length
        return (
          <Link
            key={category.title}
            to={`/categoria/${slugify(category.title)}`}
            className="block hover:no-underline"
          >
            <SpotlightCard spotlightColor="rgba(139, 92, 246, 0.30)" className="h-full p-5 text-left">
              <h3 className="font-semibold text-ink-heading">{category.title}</h3>
              <p className="mt-1 text-sm text-ink-muted">
                {count === 1 ? '1 artigo' : `${count} artigos`}
              </p>
            </SpotlightCard>
          </Link>
        )
      })}
    </div>
  ) : (
    <FadeContent duration={700}>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {config.categories.map((category) => {
          const count = Object.values(articles).filter((article) =>
            article.categories.includes(category.title),
          ).length
          return (
            <Link
              key={category.title}
              to={`/categoria/${slugify(category.title)}`}
              className="block hover:no-underline"
            >
              <SpotlightCard spotlightColor="rgba(139, 92, 246, 0.30)" className="h-full p-5 text-left">
                <h3 className="font-semibold text-ink-heading">{category.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">
                  {count === 1 ? '1 artigo' : `${count} artigos`}
                </p>
              </SpotlightCard>
            </Link>
          )
        })}
      </div>
    </FadeContent>
  )}
</section>
```

- [x] **Step 4: Verificar lint/build/test**

Run: `npm run lint` → exit 0.
Run: `npm run build` → exit 0.
Run: `npm run test` → 16 pass.

- [x] **Step 5: Commit**

`git add src/pages/Home.tsx`
`git commit -m "feat: cards com spotlight e reveals na página inicial"`

---

### Task 6: Header (CTA magnético + glow no logo)

**Files:**
- Modify: `src/components/Header.tsx`

**Interfaces:**
- Consumes: `Magnet`, `useReducedMotion`.
- Produces: logo com glow suave no hover; botão "Artigo aleatório" magnético (e neutro com reduced-motion). Nada muda de comportamento.

- [x] **Step 1: Aplicar glow no logo e magnet no CTA**

Em `src/components/Header.tsx`, importar e ajustar:

```tsx
import { Link, useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'
import Magnet from './reactbits/Animations/Magnet/Magnet'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useWiki } from '../store/index'

interface HeaderProps {
  siteName: string
}

function Header({ siteName }: HeaderProps) {
  const { articles } = useWiki()
  const reduceMotion = useReducedMotion()
  const navigate = useNavigate()

  const handleRandom = () => {
    const slugs = Object.keys(articles)
    if (slugs.length === 0) return
    const slug = slugs[Math.floor(Math.random() * slugs.length)]
    navigate(`/wiki/${encodeURIComponent(slug)}`)
  }

  const randomButton = (
    <button
      type="button"
      onClick={handleRandom}
      className="shrink-0 rounded border border-line bg-surface px-3 py-1.5 text-sm text-ink hover:border-accent"
    >
      Artigo aleatório
    </button>
  )

  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link
          to="/"
          className="text-xl font-semibold text-ink-heading transition-shadow duration-300 hover:drop-shadow-[0_0_10px_var(--color-glow)] hover:no-underline"
        >
          {siteName}
        </Link>
        <SearchBar className="max-w-sm flex-1" />
        {reduceMotion ? randomButton : <Magnet magnetStrength={4}>{randomButton}</Magnet>}
      </div>
    </header>
  )
}

export default Header
```

Nota: header agora usa `bg-surface` (painel elevado do tema) — recebe os tokens automaticamente.

- [x] **Step 2: Verificar lint/build/test**

Run: `npm run lint` → exit 0.
Run: `npm run build` → exit 0.
Run: `npm run test` → 16 pass.

- [x] **Step 3: Commit**

`git add src/components/Header.tsx`
`git commit -m "feat: cta magnético e glow no logo do header"`

---

### Task 7: ArticleView (Infobox spotlight + Editar magnético)

**Files:**
- Modify: `src/pages/ArticleView.tsx`

**Interfaces:**
- Consumes: `SpotlightCard`, `Magnet`, `useReducedMotion`.
- Produces: Infobox envolvido em SpotlightCard (quando `article.infobox`); botões "Editar" e "Criar este artigo" magnéticos (neutros com reduced-motion). Estados "não encontrado" e layout intactos.

- [x] **Step 1: Editar `src/pages/ArticleView.tsx`**

```tsx
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Infobox } from '../components/index'
import SpotlightCard from '../components/reactbits/Components/SpotlightCard/SpotlightCard'
import Magnet from '../components/reactbits/Animations/Magnet/Magnet'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useWiki } from '../store/index'

function ArticleView() {
  const { slug = '' } = useParams()
  const { articles } = useWiki()
  const reduceMotion = useReducedMotion()
  const article = articles[slug]

  if (!article) {
    const criar = (
      <Link
        to={`/editor?slug=${encodeURIComponent(slug)}`}
        className="mt-4 inline-block rounded border border-line bg-surface px-3 py-1.5 text-sm text-accent hover:border-accent"
      >
        Criar este artigo
      </Link>
    )
    return (
      <div>
        <h1 className="text-2xl font-bold text-ink-heading">Artigo não encontrado</h1>
        <p className="mt-2 text-ink-muted">
          Não existe nenhum artigo com o endereço “{slug}”.
        </p>
        {reduceMotion ? criar : <Magnet magnetStrength={4}>{criar}</Magnet>}
      </div>
    )
  }

  const editar = (
    <Link
      to={`/editor?slug=${encodeURIComponent(article.slug)}`}
      className="shrink-0 rounded border border-line bg-surface px-3 py-1.5 text-sm text-accent hover:border-accent"
    >
      Editar
    </Link>
  )

  return (
    <article>
      <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
        <h1 className="text-3xl font-bold text-ink-heading">{article.title}</h1>
        {reduceMotion ? editar : <Magnet magnetStrength={4}>{editar}</Magnet>}
      </div>

      {article.summary && <p className="mt-3 text-ink-muted">{article.summary}</p>}

      <div className="mt-4">
        <div className="markdown">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
        {article.infobox && (
          <div className="mt-4 md:float-right md:ml-6 md:mt-0 md:w-72">
            <SpotlightCard spotlightColor="rgba(139, 92, 246, 0.28)" className="p-0">
              <Infobox data={article.infobox} />
            </SpotlightCard>
          </div>
        )}
      </div>
    </article>
  )
}

export default ArticleView
```

- [x] **Step 2: Verificar lint/build/test**

Run: `npm run lint` → exit 0.
Run: `npm run build` → exit 0.
Run: `npm run test` → 16 pass.

- [x] **Step 3: Commit**

`git add src/pages/ArticleView.tsx`
`git commit -m "feat: infobox com spotlight e edição magnética no artigo"`

---

### Task 8: CategoryPage e SearchPage (cards spotlight + CTA magnético)

**Files:**
- Modify: `src/pages/CategoryPage.tsx`, `src/pages/SearchPage.tsx`

**Interfaces:**
- Consumes: `SpotlightCard` (+ `Magnet` se usado), `useReducedMotion`.
- Produces: lista de artigos em cards spotlight (navegação real via `Link`), título inalterado, estados vazios PT-BR mantidos. O gating de reduced-motion é do próprio `SpotlightCard` (guard interno da Task 2) — **não** declarar `useReducedMotion` nesses arquivos (ficaria órfão e quebraria `noUnusedLocals`).

- [x] **Step 1: Editar `src/pages/CategoryPage.tsx`**

```tsx
import { Link, useParams } from 'react-router-dom'
import { useWiki } from '../store/index'
import { slugify } from '../utils/slug'
import SpotlightCard from '../components/reactbits/Components/SpotlightCard/SpotlightCard'

function CategoryPage() {
  const { categoria = '' } = useParams()
  const { config, articles } = useWiki()

  const matched = config.categories.find((category) => slugify(category.title) === categoria)
  const title = matched?.title ?? categoria

  const items = Object.values(articles).filter((article) =>
    article.categories.some((category) => slugify(category) === categoria),
  )

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-heading">{title}</h1>
      {items.length === 0 ? (
        <p className="mt-3 text-ink-muted">Nenhum artigo nesta categoria ainda.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {items.map((article) => (
            <li key={article.slug}>
              <Link to={`/wiki/${encodeURIComponent(article.slug)}`} className="block hover:no-underline">
                <SpotlightCard spotlightColor="rgba(139, 92, 246, 0.30)" className="p-4 text-left">
                  <h2 className="font-semibold text-ink-heading">{article.title}</h2>
                  <p className="mt-1 text-sm text-ink-muted">{article.summary}</p>
                </SpotlightCard>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CategoryPage
```

- [x] **Step 2: Editar a lista de resultados de `src/pages/SearchPage.tsx`**

Adicionar apenas o import do SpotlightCard:

```tsx
import SpotlightCard from '../components/reactbits/Components/SpotlightCard/SpotlightCard'
```

No corpo, substituir o `<ul>` de resultados por:

```tsx
<ul className="mt-4 space-y-3">
  {results.map((article) => (
    <li key={article.slug}>
      <Link to={`/wiki/${encodeURIComponent(article.slug)}`} className="block hover:no-underline">
        <SpotlightCard spotlightColor="rgba(139, 92, 246, 0.30)" className="p-4 text-left">
          <h2 className="font-semibold text-ink-heading">{article.title}</h2>
          <p className="mt-1 text-sm text-ink-muted">{article.summary}</p>
        </SpotlightCard>
      </Link>
    </li>
  ))}
</ul>
```

(Nada mais muda no SearchPage. Não adicionar `useReducedMotion` aqui: não haveria nenhum uso e `noUnusedLocals` quebraria o build — o `SpotlightCard` já ignora o hover glow sob reduced-motion via guard interno.)

- [x] **Step 3: Verificar lint/build/test**

Run: `npm run lint` → exit 0.
Run: `npm run build` → exit 0.
Run: `npm run test` → 16 pass.

- [x] **Step 4: Commit**

`git add src/pages/CategoryPage.tsx src/pages/SearchPage.tsx`
`git commit -m "feat: cards com spotlight nas páginas de categoria e busca"`

---

### Task 9: Verificação final e polimento

**Files:**
- Verify: build/lint/test/dev-server; corrigir qualquer desvio visual detectável por código.
- Modify: `docs/superpowers/plans/2026-09-05-b3wiki-redesign.md` (marcar tasks concluídas) e `docs/superpowers/specs/2026-09-05-b3wiki-redesign-design.md` apenas se necessário.

**Interfaces:**
- Consumes: tudo das Tasks 1-8.
- Produces: MVP do redesign verificado; checklist da spec atendido; commits finais.

- [x] **Step 1: Suíte completa**

Run: `npm run lint` → exit 0.
Run: `npm run test` → 16 pass.
Run: `npm run build` → exit 0.

- [x] **Step 2: Smoke test do dev server**

Run (PowerShell, e depois encerrar o processo quando terminar):

```
$p = Start-Process -FilePath "npm" -ArgumentList "run","dev" -PassThru -NoNewWindow
Start-Sleep -Seconds 8
(Invoke-WebRequest -Uri "http://localhost:5173/").StatusCode
Stop-Process -Id $p.Id
```

Expected: `StatusCode` = 200.

- [x] **Step 3: Checklist manual da spec (documentado ao usuário)**

Não é executado pelo agente (precisa de navegador). Listar para o usuário no relatório final conforme a seção "Verificação" da spec: (1) fundo Particles calmo em todas as páginas; (2) hero anima com gradiente, stats contam, CTAs magnéticos; (3) spotlight segue o mouse e cliques navegam; (4) infobox com spotlight; (5) modo claro legível com hero escuro impactante; (6) reduced-motion → tudo estático e visível; (7) aba em segundo plano → fundo pausado; (8) editor limpo e utilizável.

- [x] **Step 4: Corrigir divergências detectáveis**

Se lint/build/test apontarem algo (ex.: `noUnusedLocals` em algum import que a instrução não usou), corrigir em edição mínima e repetir o Step 1.

- [x] **Step 5: Atualizar o plano (checks) e commit final**

Marcar todas as tarefas deste plano como `- [x]` e commitar:

`git add -A`
`git commit -m "chore: verificação final do redesign reactbits"`

(Se não houver mudança de arquivos além do plano, o commit será só do plano.)