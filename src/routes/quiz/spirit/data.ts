import { range } from 'it-range';

export type Style = 'plain' | 'scale' | 'stars' | 'agree';

export interface Answer { id: string, name: string };
export interface Question { id: string; name: string, answers: Answer[]; style: Style; };

const q = (id: string) => (name: string, style: Style = 'plain') => (...answers: Answer[]) => ({ name, id, answers, style } as Question);
const ans = (id: string) => (name: string) => ({ name, id } as Answer);
const scale = (id: string) => (name: string, style: Style = 'scale') => (lower: number, higher: number, by = 1) => q(id)(name, style)(...[...range(lower, higher + by, by)].map(n => ans(n.toString())(n.toString())));
const stars = (id: string) => (name: string, style: Style = 'stars') => (amt: number) => q(id)(name, style)(...[...range(amt)].map(i => i + 1).map(i => ans(i.toString())(i.toString())));

const agreeNames = new Map<number, string>([
	[-3, 'Forte disaccordo'],
	[-2, 'Disaccordo'],
	[-1, 'Leggero disaccordo'],
	[0, 'Indifferente'],
	[1, 'Leggero consenso'],
	[2, 'Consenso'],
	[3, 'Forte consenso'],
]);

const agree = (id: string) => (name: string, style: Style = 'agree') => q(id)(name, style)(...[...range(-3, 4)].map(i => ans(i.toString())(agreeNames.get(i))));

const questions: Question[] = [
	q('q1')('Question 1')(ans('a1')('Answer 1'), ans('a2')('Answer 2'), ans('a3')('Answer 3')),
	q('kai')('kai')(ans('kai1')('χ1'), ans('kai2')('χ2'), ans('kai3')('χ3'), ans('kai4')('χ4')),
	scale('scale')('Scale Question')(1, 5, 0.5),
	stars('stars')('Rating')(5),
	agree('agree')("I'm sociable"),
];

export default questions;

export const names = questions.map(_ => _.id);

export const profiles = {
	balanced: {
		
	}
};