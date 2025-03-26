import { useContext } from "react"
import { gameContext } from "./gameContext"

export function PreviousAttempts() {
	const { attempts } = useContext(gameContext)
	return <div>
      {attempts.map((x, i) => <p key={i}>{x}</p>)}
    </div>
}
