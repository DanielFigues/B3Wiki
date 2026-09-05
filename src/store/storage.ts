const PREFIX = 'b3wiki:'

export function load<T>(key: string, fallback: T): T {
  const fullKey = `${PREFIX}${key}`
  try {
    const raw = window.localStorage.getItem(fullKey)
    if (raw === null) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function save(key: string, value: unknown): void {
  const fullKey = `${PREFIX}${key}`
  try {
    window.localStorage.setItem(fullKey, JSON.stringify(value))
  } catch {
    // sem ação: falha de quota/privacidade não pode derrubar o app
  }
}