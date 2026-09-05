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
