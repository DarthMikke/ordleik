export enum SolutionValidity {
	Incorrect,
	WrongPlacement,
	Correct
}

export function validate(attempt: string, solution: string) {
	let _solution = Array.from(solution).map(
		(x, i) => {return {letter: x, index: i}}
	)

	let ret = [..._solution].map((x) => {
		// Happy path: The inserted letter matches the solution
		if (x.letter == attempt[x.index]) {
			_solution = _solution.filter(y => x.index != y.index);
			return SolutionValidity.Correct;
		} else {
			return SolutionValidity.Incorrect;
		}
	});

	return ret.map((x, i) => {
		if (x == SolutionValidity.Correct) {
			return x;
		}

		// Second best: The inserted letter is somewhere in the solution
		const letterIndex = _solution.findIndex(y => y.letter == attempt[i]);
		if (letterIndex >= 0) {
			_solution = _solution.filter(y => _solution[letterIndex].index != y.index);
			return SolutionValidity.WrongPlacement;
		}

		return SolutionValidity.Incorrect;
	});
}
