import { useEffect, useState } from 'react'
import { gameContext } from './gameContext'
import './App.css'
import { PreviousAttempts } from './PreviousAttempts';
import { validate } from './validate';

enum GameState {
  playing,
  finished,
}

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
      <div className="card game-input">
        <PreviousAttempts />
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
        { gameState == GameState.finished &&
            (attempts[attempts.length - 1] == solution
              ? <div className="p-3 rounded-2 mb-2 bg-success text-light">Congratulations, you won!</div>
              : <div className="p-3 rounded-2 mb-2 bg-warning text-dark">Good luck next time!</div>
            )
        }
      </div>
    </gameContext.Provider>
  )
}

export default App
