import { beforeEach, describe, expect, it } from 'vitest'
import { load, save } from './storage'

describe('storage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('retorna o fallback quando a chave não existe', () => {
    expect(load('articles', { vazio: true })).toEqual({ vazio: true })
  })

  it('salva e lê um valor', () => {
    const data = { a: 1 }
    save('config', data)
    expect(load('config', null)).toEqual(data)
  })

  it('usa o prefixo b3wiki:', () => {
    save('articles', { ok: true })
    expect(window.localStorage.getItem('b3wiki:articles')).not.toBeNull()
  })

  it('retorna o fallback quando o JSON está corrompido', () => {
    window.localStorage.setItem('b3wiki:config', '{corrompido')
    expect(load('config', { fallback: true })).toEqual({ fallback: true })
  })
})