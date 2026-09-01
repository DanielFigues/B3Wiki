import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="home">
      <div className="home-hero">
        <h1>Welcome to B3Wiki</h1>
        <p>
          A community-run encyclopedia for our Discord server. Explore articles,
          learn about the community, and contribute your own knowledge.
        </p>
      </div>

      <section className="home-section">
        <h2>Getting Started</h2>
        <p>
          Browse the sidebar to explore categories, or create a new article
          using the editor.
        </p>
        <div className="home-actions">
          <Link to="/wiki/example" className="home-action">
            View an example article
          </Link>
          <Link to="/editor" className="home-action">
            Write a new article
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
