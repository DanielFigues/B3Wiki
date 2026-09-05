import { Link } from 'react-router-dom'
import { useWiki } from '../store/index'
import { slugify } from '../utils/slug'

function Sidebar() {
  const { config } = useWiki()

  return (
    <aside className="w-56 shrink-0 border-r border-line bg-surface">
      <nav aria-label="Navegação da wiki" className="p-4">
        {config.categories.map((category) => (
          <section key={category.title} className="mb-5">
            <Link
              to={`/categoria/${slugify(category.title)}`}
              className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-muted hover:text-accent hover:no-underline"
            >
              {category.title}
            </Link>
            <ul className="space-y-0.5">
              {category.links.map((link) => (
                <li key={link.slug}>
                  <Link to={link.url} className="text-sm text-accent hover:underline">
                    {link.title}
                  </Link>
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