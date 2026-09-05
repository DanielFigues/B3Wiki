import { Link } from 'react-router-dom'
import { useWiki } from '../store/index'
import { slugify } from '../utils/slug'
import { useReducedMotion } from '../hooks/useReducedMotion'
import SplitText from '../components/reactbits/TextAnimations/SplitText/SplitText'
import BlurText from '../components/reactbits/TextAnimations/BlurText/BlurText'
import CountUp from '../components/reactbits/TextAnimations/CountUp/CountUp'

import Particles from '../components/reactbits/Backgrounds/Particles/Particles'
import SpotlightCard from '../components/reactbits/Components/SpotlightCard/SpotlightCard'
import ShinyText from '../components/reactbits/TextAnimations/ShinyText/ShinyText'
import FadeContent from '../components/reactbits/Animations/FadeContent/FadeContent'

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
      <section className="hero-dark relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24 text-center sm:px-12">
        {!reduceMotion && (
          <div className="absolute inset-0">
            <Particles
              particleCount={250}
              particleSpread={14}
              speed={0.1}
              particleColors={['#8b5cf6', '#a78bfa', '#6d28d9']}
              moveParticlesOnHover
              particleHoverFactor={1.2}
              alphaParticles
              particleBaseSize={90}
            />
          </div>
        )}

        <div className="relative z-10">
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
            {ctaExplorar}
            {ctaCriar}
          </div>
        </div>
      </section>

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
    </div>
  )
}

export default Home