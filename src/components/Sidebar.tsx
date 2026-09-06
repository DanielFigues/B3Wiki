import { NavLink } from 'react-router-dom'
import { useWiki } from '../store/index'
import { slugify } from '../utils/slug'

interface SidebarProps {
  collapsed?: boolean
}

function Sidebar({ collapsed = false }: SidebarProps) {
  const { config } = useWiki()

  return (
    <aside
      className={`sticky top-0 h-svh shrink-0 self-start border-r border-line bg-surface/60 backdrop-blur-xl transition-[width] duration-300 ${
        collapsed ? 'w-0 overflow-hidden border-r-0' : 'w-56 overflow-hidden'
      }`}
    >
      <nav aria-label="Navegação da wiki" className="w-56 p-4">
        <p className="mb-4 px-2 text-xs font-semibold uppercase tracking-widest text-ink-muted">
          Navegação
        </p>
        {config.categories.map((category) => (
          <section key={category.title} className="mb-5">
            <NavLink
              to={`/categoria/${slugify(category.title)}`}
              className={({ isActive }) =>
                `group mb-1.5 flex items-center justify-between rounded-md px-2 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
                  isActive
                    ? 'bg-accent-soft text-ink-heading'
                    : 'text-ink-muted hover:bg-surface hover:text-ink-heading'
                }`
              }
            >
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-accent to-accent-2" />
                {category.title}
              </span>
            </NavLink>
            <ul className="ml-2 space-y-0.5 border-l border-line/60 pl-2">
              {category.links.map((link) => (
                <li key={link.slug}>
                  <NavLink
                    to={link.url}
                    className={({ isActive }) =>
                      `block rounded-md px-2 py-1 text-sm transition-colors ${
                        isActive
                          ? 'bg-accent-soft font-medium text-accent'
                          : 'text-ink-muted hover:bg-surface hover:text-ink-heading'
                      }`
                    }
                  >
                    {link.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar