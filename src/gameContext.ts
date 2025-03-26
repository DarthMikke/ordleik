import { createContext } from "react"

export type GameContext = {
  attempts: string[]
  currentWord: string
  setCurrentWord: (newWord: string) => void
  submit: () => void
  solution: string
}

export const gameContext = createContext<GameContext>({
  attempts: [],
  currentWord: '',
  setCurrentWord: (_: string) => { return },
  submit: () => {},
  solution: 'test ',
})
