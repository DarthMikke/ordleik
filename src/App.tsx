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
    if (currentWord == solution) {
      setGameState(GameState.finished);
    }
    setCurrentWord('');
  }

  return (
    <gameContext.Provider value={{
      attempts,
      currentWord, setCurrentWord: (newWord: string) => {setCurrentWord(newWord)},
      submit,
      solution
    }}>
      <div className="game-input">
        <PreviousAttempts />
        <form className='form flex my-3' onSubmit={(_) => {submit()}}>
          <div className='input-group'>
            <input type="text" className='form-control'
              disabled={gameState == GameState.finished}
              onInput={(e) => {setCurrentWord((e.target as HTMLInputElement).value.toLowerCase())}} value={currentWord}/>
            <button type="submit" className='btn btn-primary'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                submit();
              }}
              disabled={gameState == GameState.finished || currentWord.length != 5}>Play</button>
          </div>
        </form>
        { gameState == GameState.finished &&
            (attempts[attempts.length - 1] == solution
              ? <div className="alert alert-success">Congratulations, you won!</div>
              : <div className="alert alert-warning">Good luck next time!</div>
            )
        }
      </div>
    </gameContext.Provider>
  )
}

export default App
