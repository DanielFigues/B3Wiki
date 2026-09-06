import { useEffect, useRef, useState } from 'react'
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

  const [visible, setVisible] = useState(false)
  const [hiding, setHiding] = useState(false)
  const hideTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (!isLanding) return
    const onScroll = () => {
      const show = window.scrollY > window.innerHeight * 0.66
      if (show) {
        if (hideTimer.current !== undefined) {
          window.clearTimeout(hideTimer.current)
          hideTimer.current = undefined
        }
        setHiding(false)
        setVisible(true)
      } else if (visible && !hiding) {
        setHiding(true)
        hideTimer.current = window.setTimeout(() => {
          setVisible(false)
          setHiding(false)
          hideTimer.current = undefined
        }, 220)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (hideTimer.current !== undefined) window.clearTimeout(hideTimer.current)
    }
  }, [isLanding, visible, hiding])

  if (isLanding && !visible) return null

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
    <header
      className={`${hiding ? 'header-slide-out' : 'header-slide-in'} backdrop-blur-xl ${isLanding ? 'fixed inset-x-0 top-0 z-40' : ''} border-b border-line/40 bg-surface/50`}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        {!isLanding && toggleSidebarButton}
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