import { Link } from 'react-router-dom'
import { useWiki } from '../store/index'
import { slugify } from '../utils/slug'

function Home() {
  const { config, articles } = useWiki()

  const recent = Object.values(articles)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 5)

  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-3xl font-bold text-ink-heading">{config.name}</h1>
        <p className="mt-1 text-ink-muted">{config.tagline}</p>
      </section>

      <section>
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