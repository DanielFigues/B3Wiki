import { Link } from 'react-router-dom'

interface HeaderProps {
  siteName: string
}

function Header({ siteName }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-logo">
          {siteName}
        </Link>
        <nav className="header-nav" aria-label="Top navigation">
          <Link to="/">Home</Link>
          <span className="header-separator" aria-hidden="true">
            |
          </span>
          <Link to="/wiki/example">Random Article</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
