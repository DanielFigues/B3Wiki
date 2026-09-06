import { Link } from 'react-router-dom'
import SpotlightCard from './reactbits/Components/SpotlightCard/SpotlightCard'
import { formatDate } from '../utils/date'
import type { Article } from '../types/index'

interface ArticleCardProps {
  article: Article
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`
}

function ArticleCard({ article, spotlightColor = 'rgba(139, 92, 246, 0.30)' }: ArticleCardProps) {
  return (
    <Link to={`/wiki/${encodeURIComponent(article.slug)}`} className="block h-full hover:no-underline">
      <SpotlightCard spotlightColor={spotlightColor} className="h-full p-4 text-left">
        <h3 className="font-semibold text-ink-heading">{article.title}</h3>
        <p className="mt-1 text-sm text-ink-muted">{article.summary}</p>
        <p className="mt-3 text-xs text-ink-muted">
          <span className="rounded bg-surface px-1.5 py-0.5 text-accent">{article.categories[0]}</span>
          <span className="ml-2">{formatDate(article.updatedAt)}</span>
        </p>
      </SpotlightCard>
    </Link>
  )
}

export default ArticleCard