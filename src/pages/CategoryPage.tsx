import { useParams } from 'react-router-dom'
import { useWiki } from '../store/index'
import { slugify } from '../utils/slug'
import ArticleCard from '../components/ArticleCard'

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
      <p className="mt-1 text-sm text-ink-muted">
        {items.length === 1 ? '1 artigo' : `${items.length} artigos`}
      </p>
      {items.length === 0 ? (
        <p className="mt-6 text-ink-muted">Nenhum artigo nesta categoria ainda.</p>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((article) => (
            <li key={article.slug}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CategoryPage