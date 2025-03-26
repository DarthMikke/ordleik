export enum SolutionValidity {
	Incorrect,
	WrongPlacement,
	Correct
}

export function validate(attempt: string, solution: string) {
	const mapping: SolutionValidity[] = [];

	for (var i = 0; i < Math.min(attempt.length, solution.length); i++) {
		if (attempt[i] == solution[i]) {
			mapping.push(SolutionValidity.Correct);
			continue;
		}

		if (solution.includes(attempt[i])) {
			mapping.push(SolutionValidity.WrongPlacement);
			continue;
		}

		mapping.push(SolutionValidity.Incorrect);
	}

	return mapping;
}
