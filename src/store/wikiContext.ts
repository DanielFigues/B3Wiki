import { createContext } from 'react'
import type { Dispatch } from 'react'
import type { WikiAction, WikiState } from './wikiReducer'

export interface WikiContextValue {
  state: WikiState
  dispatch: Dispatch<WikiAction>
}

export const WikiContext = createContext<WikiContextValue | null>(null)