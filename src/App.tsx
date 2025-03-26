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
  attempts: string[]
  currentWord: string
  setCurrentWord: (newWord: string) => void
  submit: () => void
  solution: string
enum GameState {
  playing,
  finished,
}

const gameContext = createContext<GameContext>({
  attempts: [],
  currentWord: '',
  setCurrentWord: (_: string) => { return },
  submit: () => {},
  solution: 'test ',
})

function App() {
  const solution = "water"

  const [currentWord, setCurrentWord] = useState("");
  const [attempts, setAttempts] = useState<string[]>([]);
  const [gameState, setGameState] = useState<GameState>(GameState.playing)

  useEffect(() => {
    console.log(gameState)
  }, [gameState])

  useEffect(() => {
    console.log(attempts.length)

    if (attempts.length >= 5) {
      setGameState(GameState.finished);
    }
  }, [attempts])

  const submit = () => {
    setAttempts([...attempts, currentWord]);
    setCurrentWord('');
  }

  return (
    <gameContext.Provider value={{
      attempts,
      currentWord, setCurrentWord: (newWord: string) => {setCurrentWord(newWord)},
      submit,
      solution
    }}>
      <h1>Demo</h1>
      <div className="card game-input">
        <div>
          {attempts.map((x, i) => <p key={i}>{x}</p>)}
        </div>
        <div className='flex'>
          <input type="text" className='input'
            disabled={gameState == GameState.finished}
            onInput={(e) => {setCurrentWord((e.target as HTMLInputElement).value)}} value={currentWord}/>
          <button type="submit" className='btn btn-primary'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              submit();
            }}
            disabled={gameState == GameState.finished}>Play</button>
        </div>
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
