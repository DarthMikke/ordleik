import { useContext } from "react"
import { gameContext } from "./gameContext"
import { validate } from "./validate"

function SingleAttempt({attempt, ...props}: {attempt: string} & React.PropsWithChildren) {
	const { solution } = useContext(gameContext);

	return <p {...props}>{attempt}</p>
}

export function PreviousAttempts() {
	const { attempts } = useContext(gameContext);
	return <div>
      {attempts.map((x, i) => <SingleAttempt key={i} attempt={x}/>)}
    </div>
}
