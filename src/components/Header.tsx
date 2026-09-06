import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'
import { useWiki } from '../store/index'
import { slugify } from '../utils/slug'

interface HeaderProps {
  siteName: string
  sidebarCollapsed: boolean
  onToggleSidebar: () => void
}

function Header({ siteName, sidebarCollapsed, onToggleSidebar }: HeaderProps) {
  const { articles, config } = useWiki()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isLanding = pathname === '/'

  if (isLanding) return null

  const handleRandom = () => {
    const slugs = Object.keys(articles)
    if (slugs.length === 0) return
    const slug = slugs[Math.floor(Math.random() * slugs.length)]
    navigate(`/wiki/${encodeURIComponent(slug)}`)
  }

  const toggleSidebarButton = (
    <button
      type="button"
      onClick={onToggleSidebar}
      aria-label={sidebarCollapsed ? 'Abrir menu lateral' : 'Fechar menu lateral'}
      aria-expanded={!sidebarCollapsed}
      className="shrink-0 rounded border border-line bg-surface p-1.5 text-ink hover:border-accent"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="2" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <line x1="7" y1="3" x2="7" y2="15" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </button>
  )

  const categoryLinks = (
    <nav aria-label="Categorias" className="hidden items-center gap-1.5 lg:flex">
      {config.categories.map((category) => (
        <NavLink
          key={category.title}
          to={`/categoria/${slugify(category.title)}`}
          className={({ isActive }) =>
            `whitespace-nowrap rounded-full px-3 py-1 text-sm transition-colors ${
              isActive ? 'bg-accent-soft text-accent' : 'text-ink-muted hover:bg-surface hover:text-ink-heading'
            }`
          }
        >
          {category.title}
        </NavLink>
      ))}
    </nav>
  )

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
    <header className="bg-transparent">
      <div className="flex items-center gap-3 px-4 py-3">
        {toggleSidebarButton}
        <Link
          to="/"
          className="shrink-0 text-xl font-semibold text-ink-heading transition-shadow duration-300 hover:drop-shadow-[0_0_10px_var(--color-glow)] hover:no-underline"
        >
          {siteName}
        </Link>
        {categoryLinks}
        <SearchBar className="max-w-sm flex-1" />
        {randomButton}
      </div>
    </header>
  )
}

export default Header