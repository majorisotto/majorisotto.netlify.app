import * as yaml from 'yaml';

export function sleep(ms: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export function identity<A>(a: A): A {
	return a;
}

export function jsonToYaml(json: string): string {
	return yaml.stringify(JSON.parse(json));
}

export function random(min: number, max: number): number {
	if (min > max) [min, max] = [max, min];
	return Math.floor(Math.random() * (max - min)) + min;
}