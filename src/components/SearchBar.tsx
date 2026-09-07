import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

interface SearchBarProps {
  className?: string
}

function SearchBar({ className = '' }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const debounceRef = useRef<number | undefined>(undefined)

  const go = (value: string) => {
    const trimmed = value.trim()
    navigate(trimmed ? `/busca?q=${encodeURIComponent(trimmed)}` : '/busca')
  }

  const handleChange = (value: string) => {
    setQuery(value)
    window.clearTimeout(debounceRef.current)
    debounceRef.current = window.setTimeout(() => go(value), 300)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    window.clearTimeout(debounceRef.current)
    go(query)
  }

  return (
    <form role="search" onSubmit={handleSubmit} className={className}>
      <input
        type="search"
        value={query}
        onChange={(event) => handleChange(event.target.value)}
        placeholder="Buscar artigos…"
        className="w-full rounded border border-line bg-paper px-3 py-1.5 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-accent"
      />
    </form>
  )
}

export default SearchBar