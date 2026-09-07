import { act } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useReducedMotion } from './useReducedMotion'

function createFakeMql(initialMatches: boolean) {
  const listeners = new Set<() => void>()
  const mql = {
    matches: initialMatches,
    addEventListener: (_type: string, cb: () => void) => listeners.add(cb),
    removeEventListener: (_type: string, cb: () => void) => listeners.delete(cb),
  }
  return {
    mql,
    fire: (matches: boolean) => {
      mql.matches = matches
      listeners.forEach((cb) => cb())
    },
  }
}

describe('useReducedMotion', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('retorna true quando o sistema pede menos movimento', () => {
    const { mql } = createFakeMql(true)
    vi.stubGlobal('matchMedia', vi.fn(() => mql))
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(true)
  })

  it('retorna false quando a animação está liberada', () => {
    const { mql } = createFakeMql(false)
    vi.stubGlobal('matchMedia', vi.fn(() => mql))
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(false)
  })

  it('atualiza quando a preferência muda no meio da sessão', () => {
    const { mql, fire } = createFakeMql(false)
    vi.stubGlobal('matchMedia', vi.fn(() => mql))
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(false)
    act(() => fire(true))
    expect(result.current).toBe(true)
    act(() => fire(false))
    expect(result.current).toBe(false)
  })
})