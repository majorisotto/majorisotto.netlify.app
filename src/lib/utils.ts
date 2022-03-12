import * as yaml from 'yaml';

export function sleep(ms: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export function identity<A>(a: A): A {
	return a;
}

export function objectToYaml(value: unknown): string {
	return yaml.stringify(value);
}

export function jsonToYaml(json: string): string {
	return objectToYaml(JSON.parse(json));
}

export function random(min: number, max: number): number {
	if (min > max) [min, max] = [max, min];
	return Math.floor(Math.random() * (max - min)) + min;
}

export function errorTitle(code: number): string {
	switch (code) {
		case 404: return 'Pagina non trovata!';
		case 500: return 'Errore del server!';
		default: return `Errore (<code>${code}</code>)`;
	}
}