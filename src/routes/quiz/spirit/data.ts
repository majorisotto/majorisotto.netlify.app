// [id, display] -> [id, display][]
const questions = new Map<[string, string], [string, string][]>([
	[['q1', 'Question 1'], [['a1', 'Answer 1'], ['a2', 'Answer 2'], ['a3', 'Answer 3']]],
	[['kai', 'kai'], [['kai1', 'χ1'], ['kai2', 'χ2'], ['kai3', 'χ3'], ['kai4', 'χ4']]],
]);

export default questions;

export const names = [...questions.keys()].map(_ => _[0]);

export const objectQuestions = [...questions.entries()].map(([[id, name], answers]) => ({ id, name, answers: answers.map(([id, name]) => ({ id, name })) }));