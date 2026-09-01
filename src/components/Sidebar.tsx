import { Link } from 'react-router-dom'
import type { SidebarCategory } from '../types/index'

interface SidebarProps {
  categories: SidebarCategory[]
}

function Sidebar({ categories }: SidebarProps) {
  return (
    <aside className="sidebar">
      <nav aria-label="Wiki navigation">
        {categories.map((category) => (
          <section key={category.title} className="sidebar-section">
            <h3 className="sidebar-title">{category.title}</h3>
            <ul className="sidebar-links">
              {category.links.map((link) => (
                <li key={link.slug}>
                  <Link to={link.url}>{link.title}</Link>
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
