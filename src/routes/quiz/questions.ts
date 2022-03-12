import { range } from 'it-range';

export type Style = 'plain' | 'scale' | 'stars' | 'agree';

export interface Answer { id: string, name: string };
export interface Question { id: string; name: string, answers: Answer[]; style: Style; };

export const q = (id: string) => (name: string, style: Style = 'plain') => (...answers: Answer[]): Question => ({ name, id, answers, style });
export const ans = (id: string) => (name: string): Answer => ({ name, id });
export const scale = (id: string) => (name: string, style: Style = 'scale') => (lower: number, higher: number, by = 1): Question => q(id)(name, style)(...[...range(lower, higher + by, by)].map(n => ans(n.toString())(n.toString())));
export const stars = (id: string) => (name: string, style: Style = 'stars') => (amt: number): Question => q(id)(name, style)(...[...range(amt)].map(i => i + 1).map(i => ans(i.toString())(i.toString())));

const agreeNames = new Map<number, string>([
	[-3, 'Forte disaccordo'],
	[-2, 'Disaccordo'],
	[-1, 'Leggero disaccordo'],
	[0, 'Indifferente'],
	[1, 'Leggero consenso'],
	[2, 'Consenso'],
	[3, 'Forte consenso'],
]);

export const agree = (id: string) => (name: string, style: Style = 'agree'): Question => q(id)(name, style)(...[...range(3, -4)].map(i => ans(i.toString())(agreeNames.get(i))));