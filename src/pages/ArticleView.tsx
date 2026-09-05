import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Infobox } from '../components/index'
import { useWiki } from '../store/index'

function ArticleView() {
  const { slug = '' } = useParams()
  const { articles } = useWiki()
  const article = articles[slug]

  if (!article) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-ink-heading">Artigo não encontrado</h1>
        <p className="mt-2 text-ink-muted">
          Não existe nenhum artigo com o endereço “{slug}”.
        </p>
        <Link
          to={`/editor?slug=${encodeURIComponent(slug)}`}
          className="mt-4 inline-block rounded border border-line bg-surface px-3 py-1.5 text-sm text-accent hover:border-accent"
        >
          Criar este artigo
        </Link>
      </div>
    )
  }

  return (
    <article>
      <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
        <h1 className="text-3xl font-bold text-ink-heading">{article.title}</h1>
        <Link
          to={`/editor?slug=${encodeURIComponent(article.slug)}`}
          className="shrink-0 rounded border border-line bg-surface px-3 py-1.5 text-sm text-accent hover:border-accent"
        >
          Editar
        </Link>
      </div>

      {article.summary && <p className="mt-3 text-ink-muted">{article.summary}</p>}

      <div className="mt-4">
        <div className="markdown">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
        {article.infobox && (
          <div className="mt-4 md:float-right md:ml-6 md:mt-0 md:w-72">
            <Infobox data={article.infobox} />
          </div>
        )}
      </div>
    </article>
  )
}

export default ArticleView