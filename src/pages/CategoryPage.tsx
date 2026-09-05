import { Link, useParams } from 'react-router-dom'
import { useWiki } from '../store/index'
import { slugify } from '../utils/slug'

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
              <Link to={`/wiki/${encodeURIComponent(article.slug)}`} className="text-accent hover:underline">
                {article.title}
              </Link>
              <p className="text-sm text-ink-muted">{article.summary}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CategoryPage