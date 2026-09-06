import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { formatDate } from '../utils/date'
import { useWiki } from '../store/index'

function ArticleView() {
  const { slug = '' } = useParams()
  const { articles } = useWiki()
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
        {criar}
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
        {editar}
      </div>

      {article.summary && <p className="mt-3 max-w-3xl text-ink-muted">{article.summary}</p>}

      <div className="mt-4 max-w-3xl">
        <div className="markdown">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      </div>

      <footer className="sticky bottom-0 z-10 mt-8 border-t border-line bg-paper/70 py-2.5 text-center text-xs text-ink-muted backdrop-blur-md">
        {article.categories[0] && (
          <span className="rounded bg-surface/70 px-1.5 py-0.5 text-accent">{article.categories[0]}</span>
        )}
        <span className="ml-2">Última atualização: {formatDate(article.updatedAt)}</span>
      </footer>
    </article>
  )
}

export default ArticleView
