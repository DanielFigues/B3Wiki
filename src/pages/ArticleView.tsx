import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import Infobox from '../components/Infobox'
import type { Article } from '../types/index'

function ArticleView() {
  const { slug = '' } = useParams()

  const article: Article = {
    id: 'example',
    slug,
    title: 'Example Article',
    summary: 'This is a placeholder article rendered from Markdown.',
    content:
      '# Hello!\n\nThis is a **placeholder** article demonstrating Markdown rendering.\n\n- List item one\n- List item two\n\n> A blockquote for good measure.',
    categories: ['General'],
    updatedAt: '2026-09-01',
  }

  const infobox = {
    title: 'Example Article',
    fields: [
      { label: 'Category', value: 'General' },
      { label: 'Last updated', value: '2026-09-01' },
    ],
  }

  return (
    <article className="article">
      <div className="article-header">
        <h1>{article.title}</h1>
        <Link to={`/editor?slug=${encodeURIComponent(slug)}`} className="edit-link">
          Edit
        </Link>
      </div>
      <p className="article-summary">{article.summary}</p>

      <div className="article-body">
        <div className="article-content">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
        <Infobox data={infobox} />
      </div>
    </article>
  )
}

export default ArticleView
