import { type Question, agree } from "../questions";

export enum Trait {
	Extroverted,
	Thoughtful,
	Artful,
}

export const traitArray: [Trait, string, string][] = [
	[Trait.Extroverted, 'Estroverso', 'Introverso'],
	[Trait.Thoughtful, 'Riflessivo', 'Impulsivo'],
	[Trait.Artful, 'Artistico', 'Logico'],
];
export const traits: Map<Trait, [string, string]> = new Map(traitArray.map(([trait, yes, no]) => [trait, [yes, no]]));

const questions: Question[] = ([
	['extroverted', 'Sono una persona estroversa', Trait.Extroverted, false],
	['impulsive', 'Sono una persona impulsiva', Trait.Thoughtful, true],
	['artful', 'Sono una persona artistica', Trait.Artful, false],
] as [string, string, Trait, boolean][]).map(([id, name, trait, flip]) => agree(`${id}$${trait}$${flip}`)(name));

export default questions;

export enum Affinity {
	Close = 1,
	Neutral = 0,
	Far = -1,
};

export interface Profile {
	name: string;
	description: string;
	image?: string;
}

export const profiles: Map<[Affinity, Affinity, Affinity], Profile> = new Map([
	[[Affinity.Close, Affinity.Close, Affinity.Close], {
		name: 'ERA',
		description: 'Estroverso, Riflessivo e Artistico',
	}],
	[[Affinity.Close, Affinity.Close, Affinity.Neutral], {
		name: 'ER',
		description: 'Estroverso e Riflessivo',
	}],
	[[Affinity.Close, Affinity.Close, Affinity.Far], {
		name: 'ERL',
		description: 'Estroverso, Logico e Artistico',
	}],
	[[Affinity.Close, Affinity.Neutral, Affinity.Close], {
		name: 'EA',
		description: 'Estroverso e Artistico',
	}],
	[[Affinity.Close, Affinity.Neutral, Affinity.Neutral], {
		name: 'E',
		description: 'Estroverso'
	}],
	[[Affinity.Close, Affinity.Neutral, Affinity.Far], {
		name: 'EL',
		description: 'Estroverso e Logico',
	}],
	[[Affinity.Close, Affinity.Far, Affinity.Close], {
		name: 'EIA',
		description: 'Estroverso, Impulsivo e Artistico',
	}],
	[[Affinity.Close, Affinity.Far, Affinity.Neutral], {
		name: 'EI',
		description: 'Estroverso e Impulsivo',
	}],
	[[Affinity.Close, Affinity.Far, Affinity.Far], {
		name: 'EIL',
		description: 'Estroverso, Impulsivo e Logico',
	}],
	[[Affinity.Neutral, Affinity.Close, Affinity.Close], {
		name: 'RA',
		description: 'Riflessivo e Artistico',
	}],
	[[Affinity.Neutral, Affinity.Close, Affinity.Neutral], {
		name: 'R',
		description: 'Riflessivo',
	}],
	[[Affinity.Neutral, Affinity.Close, Affinity.Far], {
		name: 'RL',
		description: 'Riflessivo e Logico',
	}],
	[[Affinity.Neutral, Affinity.Neutral, Affinity.Close], {
		name: 'A',
		description: 'Artistico',
	}],
	[[Affinity.Neutral, Affinity.Neutral, Affinity.Neutral], {
		name: 'Risotto al Parmigiano',
		image: 'https://www.romagnaatavola.it/wp-content/uploads/romagnaatavola.it/2020/12/Risotto-al-parmigiano.jpg',
		description: `Il risotto al parmigiano è semplice, piace a tutti, non si sbilancia, non rischia molto, un po' come te.`,
	}],
	[[Affinity.Neutral, Affinity.Neutral, Affinity.Far], {
		name: 'L',
		description: 'Logico',
	}],
	[[Affinity.Neutral, Affinity.Far, Affinity.Close], {
		name: 'IA',
		description: 'Impulsivo e Artistico',
	}],
	[[Affinity.Neutral, Affinity.Far, Affinity.Neutral], {
		name: 'I',
		description: 'Impulsivo',
	}],
	[[Affinity.Neutral, Affinity.Far, Affinity.Far], {
		name: 'IL',
		description: 'Impulsivo e Logico',
	}],
	[[Affinity.Far, Affinity.Close, Affinity.Close], {
		name: 'iRA',
		description: 'Introverso, Riflessivo e Artistico',
	}],
	[[Affinity.Far, Affinity.Close, Affinity.Neutral], {
		name: 'iR',
		description: 'Introverso e Riflessivo',
	}],
	[[Affinity.Far, Affinity.Close, Affinity.Far], {
		name: 'iRL',
		description: 'Introverso, Logico e Artistico',
	}],
	[[Affinity.Far, Affinity.Neutral, Affinity.Close], {
		name: 'iA',
		description: 'Introverso e Artistico',
	}],
	[[Affinity.Far, Affinity.Neutral, Affinity.Neutral], {
		name: 'i',
		description: 'Introverso'
	}],
	[[Affinity.Far, Affinity.Neutral, Affinity.Far], {
		name: 'iL',
		description: 'Introverso e Logico',
	}],
	[[Affinity.Far, Affinity.Far, Affinity.Close], {
		name: 'iIA',
		description: 'Introverso, Impulsivo e Artistico',
	}],
	[[Affinity.Far, Affinity.Far, Affinity.Neutral], {
		name: 'iI',
		description: 'Introverso e Impulsivo',
	}],
	[[Affinity.Far, Affinity.Far, Affinity.Far], {
		name: 'iIL',
		description: 'Introverso, Impulsivo e Logico',
	}],
]);

export function profile(extroverted: number, thoughtful: number, artful: number): Profile {
	const THRESHOLD = 2;

	function affinity(a: number) {
		if (a > THRESHOLD) return Affinity.Close;
		if (a < -THRESHOLD) return Affinity.Far;
		return Affinity.Neutral;
	}

	return [...profiles.entries()].find(([[E, T, A]]) => E === affinity(extroverted) && T === affinity(thoughtful) && A === affinity(artful))[1];
}