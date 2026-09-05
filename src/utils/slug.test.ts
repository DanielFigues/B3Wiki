import { describe, expect, it } from 'vitest'
import { isValidSlug, slugify } from './slug'

describe('slugify', () => {
  it('remove acentos e espaços', () => {
    expect(slugify('Comunidade Principal')).toBe('comunidade-principal')
  })

  it('remove caracteres especiais', () => {
    expect(slugify('Regras & Membros!')).toBe('regras-membros')
  })

  it('lida com valor vazio', () => {
    expect(slugify('')).toBe('')
  })
})

describe('isValidSlug', () => {
  it('aceita slugs válidos', () => {
    expect(isValidSlug('meu-artigo')).toBe(true)
    expect(isValidSlug('a')).toBe(true)
  })

  it('rejeita slugs inválidos', () => {
    expect(isValidSlug('Meu Artigo')).toBe(false)
    expect(isValidSlug('acento-á')).toBe(false)
    expect(isValidSlug('-inicio')).toBe(false)
    expect(isValidSlug('fim-')).toBe(false)
  })
})