import { Link, useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'
import { useWiki } from '../store/index'

interface HeaderProps {
  siteName: string
}

function Header({ siteName }: HeaderProps) {
  const { articles } = useWiki()
  const navigate = useNavigate()

  const handleRandom = () => {
    const slugs = Object.keys(articles)
    if (slugs.length === 0) return
    const slug = slugs[Math.floor(Math.random() * slugs.length)]
    navigate(`/wiki/${encodeURIComponent(slug)}`)
  }

  const randomButton = (
    <button
      type="button"
      onClick={handleRandom}
      className="shrink-0 rounded border border-line bg-surface px-3 py-1.5 text-sm text-ink hover:border-accent"
    >
      Artigo aleatório
    </button>
  )

  return (
    <header className="border-b border-line bg-surface">
      <div className="flex items-center gap-4 px-4 py-3">
        <Link
          to="/"
          className="text-xl font-semibold text-ink-heading transition-shadow duration-300 hover:drop-shadow-[0_0_10px_var(--color-glow)] hover:no-underline"
        >
          {siteName}
        </Link>
        <SearchBar className="max-w-sm flex-1" />
        {randomButton}
      </div>
    </header>
  )
}

export default Header