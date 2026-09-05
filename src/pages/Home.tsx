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

      <section id="artigos" className="scroll-mt-6">
        <h2 className="mb-2 text-xl font-semibold text-ink-heading">Artigos recentes</h2>
        {recent.length === 0 ? (
          <p className="text-ink-muted">Nenhum artigo ainda. Crie o primeiro no editor.</p>
        ) : (
          <ul className="space-y-3">
            {recent.map((article) => (
              <li key={article.slug}>
                <Link to={`/wiki/${encodeURIComponent(article.slug)}`} className="text-accent hover:underline">
                  {article.title}
                </Link>
                <p className="text-sm text-ink-muted">{article.summary}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="mb-2 text-xl font-semibold text-ink-heading">Categorias</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {config.categories.map((category) => {
            const count = Object.values(articles).filter((article) =>
              article.categories.includes(category.title),
            ).length
            return (
              <Link
                key={category.title}
                to={`/categoria/${slugify(category.title)}`}
                className="rounded border border-line bg-surface p-4 hover:border-accent hover:no-underline"
              >
                <h3 className="font-semibold text-ink-heading">{category.title}</h3>
                <p className="text-sm text-ink-muted">
                  {count === 1 ? '1 artigo' : `${count} artigos`}
                </p>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default Home