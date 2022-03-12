<script lang='ts'>
	import { onMount } from 'svelte';
	import { Spinner } from 'sveltestrap';

	import questions, { traitArray, traits as _traits, profile as findProfile, type Profile, Trait } from './data';
	const names = questions.map(_ => _.id);

	import { sleep, random } from '$lib/utils';
	import Plotly from '$lib/Plotly.svelte';
	import type { Data, Layout } from 'plotly.js';

	const invisibleData: Data = {
		type: 'scatterpolar',
		theta: traitArray.map(x => x[1]).concat(traitArray.map(x => x[2])),
		r: new Array(traitArray.length * 2),
	};
	let data: Data;

	const layout: Partial<Layout> = {
		height: 500,
		showlegend: false,
	};

	let search: URLSearchParams;
	let map = new Map<string, string>();
	let traits = new Map<Trait, number>(traitArray.map(x => [x[0], 0]));
	let profile: Profile;

	let mounted = false;

	onMount(async () => {
		const parseQuestion = (id: string, answer: string): [Trait, number] => {
			const [_, __, traitText, flippedText] = id.match(/(.+)\$(\d+)\$(true|false)/);
			const trait = Number.parseInt(traitText) as Trait;
			const flipped = flippedText === 'true';
			const mag = Number.parseInt(answer);
			return [trait, mag * (flipped ? -1 : 1)];
		}

		search = new URLSearchParams(location.search);
		map = new Map(names.map(name => [name, search.get(name)]));
		traits = new Map([...Object.entries([...map.entries()].map(([k, v]) => parseQuestion(k, v)).reduce((acc, [trait, value]) => ({ ...acc, [trait]: (acc?.[trait] ?? 0) + value }), {} as Record<Trait, number>))].map(([key, value]) => [Number.parseInt(key) as Trait, value]));
		const [extroverted, thoughtful, artful] = [traits.get(Trait.Extroverted), traits.get(Trait.Thoughtful), traits.get(Trait.Artful)];
		profile = findProfile(extroverted, thoughtful, artful);
		data = {
			type: 'scatterpolar',
			fill: 'toself',
			theta: [_traits.get(Trait.Extroverted)[extroverted >= 0 ? 0 : 1], _traits.get(Trait.Thoughtful)[thoughtful >= 0 ? 0 : 1], _traits.get(Trait.Artful)[artful >= 0 ? 0 : 1], _traits.get(Trait.Extroverted)[extroverted >= 0 ? 0 : 1]],
			r: [Math.abs(extroverted), Math.abs(thoughtful), Math.abs(artful), Math.abs(extroverted)],
		};

		console.log('mount!');

		const sleeping = random(200, 750);

		console.log('pretending to process for', sleeping, 'milliseconds');

		await sleep(sleeping);

		mounted = true;
	});
</script>

<svelte:head><title>spirit results</title></svelte:head>

{#if mounted}
	<h3>Sei {profile.name}</h3>
	{#if profile?.image}
		<img src={profile.image} alt={profile.name} />
	{/if}
	<p>
		{@html profile.description}
	</p>
	<Plotly {layout} data={[invisibleData, data]} />
	{#each questions as { id, name, answers } (id)}
		<p>
			{name} (<code>{id}</code>): {answers.find(_ => _.id === map.get(id))?.name} (<code>{answers.find(_ => _.id === map.get(id))?.id}</code>)
		</p>
	{/each}
{:else}
	<Spinner size='sm' />
	Elaborando le tue risposte...
{/if}