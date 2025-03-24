//import { useState } from 'react'
import { createContext, useContext, useState } from 'react'
import './App.css'

function LetterInput() {
  const [letter, setLetter] = useState("")
  return <input type="text" onInput={
    e => { setLetter((e.target as HTMLInputElement).value) }
  } value={letter} />
}

type GameContext = {
  currentLetterIndex: number
  currentWord: string[]
  solution: string
}

const gameContext = createContext<GameContext>({
  currentLetterIndex: 0,
  currentWord: ['', '', '', '', ''],
  solution: 'test '
})

function App() {
  const solution = "water"

  const context = useContext(gameContext)

  const [gameState, setGameState] = useState({
    currentLetterIndex: 0,
    currentWord: ['', '', '', '', ''],
    solution: solution
  })

  return (
    <gameContext.Provider value={gameState}>
      <h1>Demo</h1>
      <div className="card game-input">
        <LetterInput />
        <LetterInput />
        <LetterInput />
        <LetterInput />
        <LetterInput />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </gameContext.Provider>
  )
}

export default App
