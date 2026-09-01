import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

function Editor() {
  const [searchParams] = useSearchParams()
  const initialSlug = searchParams.get('slug') ?? ''
  const [slug, setSlug] = useState(initialSlug)
  const [content, setContent] = useState('# Your article title')
  const [preview, setPreview] = useState(false)

  const handleSave = () => {
    console.log('Saving article', { slug, content })
  }

  return (
    <div className="editor">
      <div className="editor-header">
        <h1>{initialSlug ? `Editing: ${initialSlug}` : 'New Article'}</h1>
        <Link to="/" className="edit-link">
          Cancel
        </Link>
      </div>

      <label className="editor-field">
        <span>Slug</span>
        <input
          type="text"
          value={slug}
          onChange={(event) => setSlug(event.target.value)}
          placeholder="my-article-slug"
        />
      </label>

      <label className="editor-field">
        <span>Content (Markdown)</span>
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows={16}
        />
      </label>

      <div className="editor-actions">
        <button type="button" onClick={() => setPreview((value) => !value)}>
          {preview ? 'Edit' : 'Preview'}
        </button>
        <button type="button" onClick={handleSave}>
          Save
        </button>
      </div>

      {preview && (
        <div className="editor-preview">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )}
    </div>
  )
}

export default Editor
