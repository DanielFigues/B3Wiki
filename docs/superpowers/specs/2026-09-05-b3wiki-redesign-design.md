# B3Wiki Redesign — Spec de Design

Data: 2026-09-05
Branch: `Initial-Style`
Status: Aprovado (brainstorming concluído)

## Contexto e objetivo

O B3Wiki (wiki da/para a comunidade de um servidor de Discord) tem um MVP funcional
(frontend-only, React 19 + Vite 8 + Tailwind 4, persistência em localStorage, PT-BR).
Este trabalho **redesenha a camada visual** do site: dark-first vibrante, com animações
via **ReactBits** (biblioteca open source de componentes animados), **sem exagero**.

O objetivo declarado é duplo:
1. **Visual moderno e vivo** — hero animado, texto com vida e micro-interações.
2. **Aprender ReactBits** em um projeto real — usar as 4 categorias da lib
   (backgrounds, text animations, componentes UI, hooks/utils) de forma significativa.

Conteúdo novo (páginas individuais de membro, seção de piadas do servidor) fica **fora**
deste escopo — será adicionado depois, reutilizando o modelo de artigos atual.

## Abordagem escolhida

**Adoção em camadas (A):** injetar ReactBits em 3 níveis, mantendo a arquitetura e o
modelo de conteúdo atuais.

1. **Global:** 1 fundo animado **sutil** (Particles, canvas 2D) montado uma única vez no
   `Layout`, sob todo o conteúdo.
2. **Hero da Home:** o tratamento mais forte — texto animado, gradiente, stats com
   contagem, CTAs magnéticos.
3. **Micro-interações:** tilt/glare em cards, spotlight que segue o mouse, botões
   magnéticos, reveals na rolagem.

Onde **não** animar: página do **Editor** (escrever sem distração), **Sidebar** (limpa),
e nenhuma animação roda quando `prefers-reduced-motion` está ativo.

## Escopo

### Inclui
- Substituir/tunear tema em `src/index.css` (dark-first + claro re-tuneado + fonte display).
- Fundo global de Particles no `Layout`.
- Hero novo em `src/pages/Home.tsx` (texto animado + stats + CTAs).
- Micro-interações em `Home`, `ArticleView`, `CategoryPage`, `SearchPage`, `Header`.
- Instalação dos componentes ReactBits (variante TS-TW) via `jsrepo`.
- Ajustes de conveniência no `index.html` (ex.: pré-conexão/regras de fonte via `<link rel="preconnect">`, se aplicável).

### Exclui
- Mudanças no modelo de dados (`src/types`, `src/store`, `src/utils`).
- Novas rotas, páginas ou conteúdo (membros/piadas).
- Alterações no `Editor` (semântica, markup e classes atuais permanecem).
- Componentes ReactBits **Pro** (pagos). Somente componentes open source.
- Frameworks de animação pesados não necessários (Three.js/WebGL).

## Fundação visual

### Dark-first

O `@theme` em `src/index.css` passa a declarar a paleta **escura como padrão**
(inverso do atual, que declara claro e sobrepõe escuro). Segue a mesma mecânica:
um bloco `@media (prefers-color-scheme: light)` com as variáveis claras **re-tuneadas**
para a nova paleta (não é o tema claro atual).

### Paleta escura (padrão)

| Token | Valor | Uso |
|---|---|---|
| `--color-paper` | `#0b0e14` | fundo da página |
| `--color-surface` | `#141824` | superfícies elevadas (cards, header, sidebar) |
| `--color-line` | `#232a3b` | bordas |
| `--color-ink` | `#d7dbe4` | texto corpo |
| `--color-ink-muted` | `#8a93a8` | texto secundário |
| `--color-ink-heading` | `#f5f7fb` | títulos |
| `--color-accent` | `#8b5cf6` | primário vibrante (violeta) |
| `--color-accent-contrast` | `#ffffff` | texto sobre accent (branco) |
| `--color-accent-2` | `#ff7a5c` | secundário vibrante (coral) — **token novo** |
| `--color-accent-soft` | `rgba(139, 92, 246, 0.14)` | brilho/véu de accent |
| `--color-glow` | `rgba(139, 92, 246, 0.25)` | brilhos pontuais (hero, hover) — **token novo** |
| `--color-code` | `#151a26` | fundo de código |

### Paleta clara re-tuneada (via `@media (prefers-color-scheme: light)`)

Mesmos nomes de token, valores claros coerentes com violeta/coral (fundo claro,
accent violeta `#7c3aed`, accent-2 coral `#e8593a`). Qualidade: legível, sem neon
esbranquiçado. O **hero escuro continua**: em modo claro a seção hero usa uma classe
própria (`.hero-dark`) com `background: #0b0e14` + textura/gradiente do tema escuro,
preservando o impacto dos gradientes animados.

### Tipografia

- **Display:** **Space Grotesk** para `h1`–`h4` e títulos de seção, via `@font-face`
  (arquivo woff2 em `public/fonts/`) + `--font-display` no `@theme`.
- **Corpo:** mantém `--font-sans` atual (sistema).
- `@layer base`: `h1,h2,h3,h4 { @apply font-display; }`; base `body` segue `bg-paper
  text-ink font-sans`.

### Acessibilidade de movimento (global)

Em `@media (prefers-reduced-motion: reduce)`:
- Particles param (não montam o canvas ou param o rAF).
- Animações de entrada (SplitText/BlurText/reveals) renderizam em estado final.
- Tilt/glare/spotlight desativados (sem transformação).
- As estatísticas/CTAs continuam visíveis e funcionais.

## Camadas da adoção

### Camada 1 — Fundo global: Particles

- Componente ReactBits `Particles` (TS-TW, canvas 2D, open source), densidade baixa,
  velocidade lenta, cor `accent` com opacidade baixa, `z` atrás do conteúdo.
- 1 instância, montada no `Layout` (`<AnimatedBackground />`).
- **Performance:** `requestAnimationFrame` limpo no unmount; pausa quando
  `document.hidden`; desligado quando `prefers-reduced-motion`.
- Envolvido num componente próprio `src/components/AnimatedBackground.tsx` (isolado,
  assetável, fica trivial trocar o efeito depois).

### Camada 2 — Hero da Home

Nova seção no topo de `src/pages/Home.tsx` (substitui o bloco atual de
`config.name`/tagline):

- **Título:** SplitText por palavra do `config.name` (`B3Wiki`), com gradiente
  violeta→coral animado (classe utilitária nova, ex. `.text-gradient-animated`).
- **Tagline:** BlurText com a `config.tagline`.
- **Stats vivos:** contagens de artigos e categorias via `useWiki()` renderizadas com
  **CountUp** ao entrar na tela (não são estáticos).
- **CTAs:** MagneticButton "Explorar wiki" (âncora para a seção de conteúdo/Home atual)
  e "Criar artigo" (rota `/editor`). Padrão: texto `accent-contrast` sobre accent;
  semântica de `<Link>` preservada.
- **Disposição/consistência:** o restante da Home (recentes + categorias) permanece.

### Camada 3 — Micro-interações

| Onde | Componente | Efeito |
|---|---|---|
| Home: cards de categoria | `TiltedCard` | tilt + glare seguindo o mouse |
| Home: lista de recentes (cards) | `SpotlightCard` | luz radial seguindo o mouse |
| Home: títulos de seção | `ShinyText` | brilho deslizante discreto no texto |
| Home: stats/hero e CTAs | `MagneticButton`/`CountUp` | veja Camada 2 |
| Header: CTA | `MagneticButton` | atração sutil do cursor |
| Header: logo | CSS `glow` | brilho suave no hover (sem lib) |
| ArticleView: Infobox | `SpotlightCard` | luz no card lateral |
| ArticleView: botão "Editar" | `MagneticButton` | CTA de ação principal |
| CategoryPage: cards de artigo | `SpotlightCard` | hover em cada card |
| SearchPage: cards de resultado | `SpotlightCard` | hover em cada card |
| Seções (reveal) | hook/util ReactBits de visibilidade | fade/slide curto ao entrar na tela |

**Sem animações:** Editor, Sidebar (exceto o que herdar de tokens), not-found e mensagens.

## Arquitetura

### Instalação dos componentes (jsrepo)

- Inicializar `jsrepo` no projeto; instalar cada componente na variante **TS-TW**
  via `npx jsrepo add <caminho>`.
- Os componentes caem em **`src/components/reactbits/<Nome>/`** (fonte copiada) —
  customizáveis e tree-shakeable.
- Dependências por componente apenas quando exigidas (provável `gsap` para SplitText;
  CountUp pode usar `motion` — decidir no ato da instalação). Sem `three`/WebGL.
- Nenhum componente Pro (não instalar nada sob `@reactbits-pro`).

### Organização de código

- **Wrappers no projeto** (importação limpa e pontos de teste):
  - `src/components/AnimatedBackground.tsx` → monta `Particles` com props de
    densidade/velocidade/cor e o gating de reduced-motion/hidden.
  - `src/components/hero/HeroStats.tsx` (ou equivalente dentro de Home) -> reúne
    CountUp + dados de `useWiki`.
- **Arquivos que mudam:**
  - `src/index.css` (tema, fonte, `.text-gradient-animated`, reduced-motion global)
  - `src/components/Layout.tsx` (monta `AnimatedBackground`)
  - `src/components/Header.tsx` (CTA magnético, glow no logo)
  - `src/components/index.ts` (barrel, se necessário)
  - `src/pages/Home.tsx` (hero + cards/animações)
  - `src/pages/ArticleView.tsx` (Infobox spotlight, botão Editar magnético)
  - `src/pages/CategoryPage.tsx` / `src/pages/SearchPage.tsx` (spotlight nos cards)
  - `index.html` (fontes/pré-connect)
  - `jsrepo.json` (nova config do registrador)
- **Não mudam:** `src/store/**`, `src/utils/**`, `src/types/**,` o `Editor`, os testes
  existentes (sem regressão).

### States vazios e contagens

- Home mantém os estados atuais (sem artigos → mensagem PT-BR; contagens zero).
- CountUp parte de 0 até o valor real; com `prefers-reduced-motion` o valor final fica
  imediato.
- Stats = derivados de `useWiki()` (`Object.keys(articles).length`,
  `config.categories.length`), nunca hardcoded.

## Performance e poluição (anti-exagero)

- 1 background global; nenhuma outra animação contínua sem fim.
- Animações de entrada **uma vez por elemento** (não em loop).
- rAF parado no unmount e com `document.hidden`; nenhum `setInterval` se o componente
  suportar rAF.
- Densidade das Particles baixa (ajustável por prop) e velocidade lenta.
- SplitText/BlurText apenas no hero (Home); nenhum texto animado nas listas.
- Sem ReactBits Pro; sem `three`/WebGL.

## Acessibilidade

- Todo o conteúdo permanece legível com animações desligadas (`prefers-reduced-motion`).
- Componentes mantêm semântica HTML (botoões = `<button>`/`<Link>`, cards clicáveis =
  `Link` real, não `div` com onClick).
- Contraste: texto `ink`/`ink-muted` sobre `paper` escuro atendem contraste; accent
  violeta para links só em estados com `underline`/peso, garantindo distinção.
- Sem foco perdido: elementos animados não dependem de hover para importantes ações.

## Verificação

- `npm run lint` — sem erros (warnings de oxlint existentes do editor permanecem aceitos).
- `npm run test` — 13 testes atuais seguem verdes (sem testes novos obrigatórios;
  opcional: 1 teste para o gating de reduced-motion se embarcado num hook próprio).
- `npm run build` — OK (`tsc -b` + vite).
- Validação manual no `npm run dev`:
  1. Fundo Particles visível e calmo em todas as páginas.
  2. Hero da Home: título anima, gradiente, stats contam, CTAs magnéticos funcionam.
  3. Cards com tilt/spotlight seguem o mouse; cliques funcionam (navegação real).
  4. Infobox com spotlight no ArticleView.
  5. Modo claro (SO = claro) legível; hero ainda impactante.
  6. `prefers-reduced-motion` (SO) → nada desliza/brilha; tudo visível.
  7. Aba em segundo plano → fundo pausa (não consome CPU).
  8. Editor segue limpo e utilizável.

## Fora de escopo (fechado)

- Páginas individuais de membro e conteúdo de piadas do servidor (fase de conteúdo,
  reutilizando o modelo de artigos).
- Backend, autenticação, multi-editor.
- Componentes Pro do ReactBits.

## Decisões registradas

| # | Decisão |
|---|---|
| 1 | Adoção em camadas (A): fundo global sutil + hero forte + micro-interações. |
| 2 | Dark-first vibrante; variante clara re-tuneada mantida (SO em claro). |
| 3 | Acentos: violeta `#8b5cf6` (accent) + coral `#ff7a5c` (accent-2, novo). |
| 4 | Fundo global = Particles (canvas 2D), 1 instância no Layout, pausa em aba oculta. |
| 5 | Tipografia display = Space Grotesk (via `@font-face` + `--font-display`). |
| 6 | ReactBits somente open source, variante TS-TW, instalado via jsrepo em `src/components/reactbits/`. |
| 7 | Editor e Sidebar fora das animações; `prefers-reduced-motion` global obrigatório. |
| 8 | Escopo = redesign visual apenas; membros/piadas entram depois como conteúdo. |