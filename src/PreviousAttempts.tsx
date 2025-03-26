import { useContext } from "react"
import { gameContext } from "./gameContext"
import { SolutionValidity, validate } from "./validate"
import './PreviousAttempts.css'

function SingleAttempt({attempt, index, ...props}: {attempt: string, index: number} & React.PropsWithChildren) {
	const { solution, attempts } = useContext(gameContext);
	const validityMapping = validate(attempt, solution);

	if (attempt.length < 5) {
		attempt = attempt.padEnd(5, ' ')
	}

	return <p className="single-attempt"
		id={`single-attempt-${index}`}
		style={{bottom: (attempts.length-index)*42 + 'px'}}
		{...props}>{Array.from(attempt).map((char, i) => {
		const cname = (() => {
			switch (validityMapping[i]) {
			case SolutionValidity.Incorrect:
				return "letter-incorrect";
			case SolutionValidity.WrongPlacement:
				return "letter-wrong_placement";
			case SolutionValidity.Correct:
				return "letter-correct";
			default:
				return "";
			}
		})();
		return <span key={`char-${i}`} className={`letter ${cname}`}
			>{char}</span>
	})}</p>
}

export function PreviousAttempts() {
	const { attempts } = useContext(gameContext);
	return <div className="previous-attempts">
      {attempts.map((x, i) => <SingleAttempt key={i} index={i} attempt={x}/>)}
    </div>
}
