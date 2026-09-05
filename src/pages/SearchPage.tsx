import { Link, useSearchParams } from 'react-router-dom'
import { useWiki } from '../store/index'

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const { articles } = useWiki()

  const setQuery = (value: string) => {
    const trimmed = value.trim()
    setSearchParams(trimmed ? { q: trimmed } : {}, { replace: true })
  }

  const normalized = query.trim().toLowerCase()
  const results = Object.values(articles).filter((article) => {
    if (normalized === '') return false
    return (
      article.title.toLowerCase().includes(normalized) ||
      article.summary.toLowerCase().includes(normalized) ||
      article.content.toLowerCase().includes(normalized)
    )
  })

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-heading">Busca</h1>
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Buscar artigos…"
        autoFocus
        className="mt-3 w-full max-w-md rounded border border-line bg-paper px-3 py-1.5 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-accent"
      />

      {query.trim() === '' ? (
        <p className="mt-4 text-ink-muted">Digite algo para buscar.</p>
      ) : results.length === 0 ? (
        <p className="mt-4 text-ink-muted">Nenhum resultado para “{query.trim()}”.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {results.map((article) => (
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

export default SearchPage