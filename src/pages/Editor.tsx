import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { useWiki, useWikiActions } from '../store/index'
import { isValidSlug } from '../utils/slug'
import type { InfoboxField } from '../types/index'

function Editor() {
  const [searchParams] = useSearchParams()
  const editSlug = searchParams.get('slug') ?? ''
  const { articles } = useWiki()
  const { upsertArticle } = useWikiActions()
  const navigate = useNavigate()

  const [slug, setSlug] = useState('')
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('# Título do artigo')
  const [categories, setCategories] = useState('')
  const [infoboxTitle, setInfoboxTitle] = useState('')
  const [infoboxFields, setInfoboxFields] = useState<InfoboxField[]>([{ label: '', value: '' }])
  const [preview, setPreview] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const existing = editSlug ? articles[editSlug] : undefined
    setSlug(existing?.slug ?? editSlug)
    setTitle(existing?.title ?? '')
    setSummary(existing?.summary ?? '')
    setContent(existing?.content ?? '# Título do artigo')
    setCategories(existing?.categories.join(', ') ?? '')
    setInfoboxTitle(existing?.infobox?.title ?? '')
    setInfoboxFields(existing?.infobox?.fields ?? [{ label: '', value: '' }])
    setPreview(false)
    setError(null)
  }, [editSlug])

  const updateField = (index: number, key: 'label' | 'value', value: string) => {
    setInfoboxFields((fields) =>
      fields.map((field, i) => (i === index ? { ...field, [key]: value } : field)),
    )
  }

  const addField = () => {
    setInfoboxFields((fields) => [...fields, { label: '', value: '' }])
  }

  const removeField = (index: number) => {
    setInfoboxFields((fields) => fields.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    const trimmedSlug = slug.trim().toLowerCase()
    if (!isValidSlug(trimmedSlug)) {
      setError('Slug inválido: use apenas letras minúsculas, números e hífens (ex.: meu-artigo).')
      return
    }
    if (title.trim() === '') {
      setError('O título é obrigatório.')
      return
    }

    const finalCategories = categories
      .split(',')
      .map((category) => category.trim())
      .filter(Boolean)

    const finalFields = infoboxFields.filter(
      (field) => field.label.trim() !== '' || field.value.trim() !== '',
    )

    upsertArticle({
      id: trimmedSlug,
      slug: trimmedSlug,
      title: title.trim(),
      summary: summary.trim(),
      content,
      categories: finalCategories,
      updatedAt: new Date().toISOString(),
      infobox:
        infoboxTitle.trim() === '' && finalFields.length === 0
          ? undefined
          : { title: infoboxTitle.trim() || title.trim(), fields: finalFields },
    })

    navigate(`/wiki/${encodeURIComponent(trimmedSlug)}`)
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
        <h1 className="text-2xl font-bold text-ink-heading">
          {editSlug ? `Editando: ${editSlug}` : 'Novo artigo'}
        </h1>
        <Link
          to="/"
          className="shrink-0 rounded border border-line bg-surface px-3 py-1.5 text-sm text-accent hover:border-accent"
        >
          Cancelar
        </Link>
      </div>

      {error && (
        <p role="alert" className="mt-3 rounded border border-line bg-accent-soft px-3 py-2 text-sm text-ink">
          {error}
        </p>
      )}

      <div className="mt-4 space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-ink-heading">Slug</span>
          <input
            type="text"
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
            disabled={editSlug !== ''}
            placeholder="meu-artigo"
            className="w-full rounded border border-line bg-paper px-3 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent disabled:bg-surface disabled:text-ink-muted"
          />
          {editSlug !== '' && (
            <span className="mt-1 block text-xs text-ink-muted">O slug não pode ser alterado em uma edição.</span>
          )}
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-ink-heading">Título</span>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full rounded border border-line bg-paper px-3 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-ink-heading">Resumo</span>
          <input
            type="text"
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
            className="w-full rounded border border-line bg-paper px-3 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-ink-heading">Categorias</span>
          <input
            type="text"
            value={categories}
            onChange={(event) => setCategories(event.target.value)}
            placeholder="Principal, Comunidade"
            className="w-full rounded border border-line bg-paper px-3 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <span className="mt-1 block text-xs text-ink-muted">Separe por vírgula.</span>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-ink-heading">Conteúdo (Markdown)</span>
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={14}
            className="w-full rounded border border-line bg-paper px-3 py-1.5 font-mono text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </label>

        <section>
          <h2 className="mb-1 text-sm font-semibold text-ink-heading">Infobox (opcional)</h2>
          <div className="space-y-2">
            <input
              type="text"
              value={infoboxTitle}
              onChange={(event) => setInfoboxTitle(event.target.value)}
              placeholder="Título da infobox"
              className="w-full rounded border border-line bg-paper px-3 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent"
            />
            {infoboxFields.map((field, index) => (
              <div key={index} className="grid grid-cols-[1fr_2fr_auto] gap-2">
                <input
                  type="text"
                  value={field.label}
                  onChange={(event) => updateField(index, 'label', event.target.value)}
                  placeholder="Rótulo"
                  className="w-full rounded border border-line bg-paper px-3 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <input
                  type="text"
                  value={field.value}
                  onChange={(event) => updateField(index, 'value', event.target.value)}
                  placeholder="Valor"
                  className="w-full rounded border border-line bg-paper px-3 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button
                  type="button"
                  onClick={() => removeField(index)}
                  aria-label={`Remover campo ${index + 1}`}
                  className="rounded border border-line bg-surface px-2 text-ink hover:border-accent"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addField}
            className="mt-2 rounded border border-line bg-surface px-3 py-1.5 text-sm text-ink hover:border-accent"
          >
            + Adicionar campo
          </button>
        </section>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPreview((value) => !value)}
            className="rounded border border-line bg-surface px-4 py-1.5 text-sm text-ink hover:border-accent"
          >
            {preview ? 'Editar' : 'Pré-visualizar'}
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded bg-accent px-4 py-1.5 text-sm font-semibold text-accent-contrast hover:opacity-90"
          >
            Salvar
          </button>
        </div>

        {preview && (
          <div className="markdown rounded border border-line bg-surface p-4">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}

export default Editor