<script lang='ts'>
	import { onMount } from 'svelte';
	import { Spinner } from 'sveltestrap';

	import questions, { names } from './data';

	import { sleep, random } from '$lib/utils';

	let search: URLSearchParams;
	let map = new Map<string, string>();

	let mounted = false;

	onMount(async () => {
		search = new URLSearchParams(location.search);
		map = new Map(names.map(name => [name, search.get(name)]));
		console.log('mount!');

		const sleeping = random(200, 1000);

		console.log('pretending to process for', sleeping, 'milliseconds');

		await sleep(sleeping);

		mounted = true;
	});
</script>

<svelte:head><title>spirit results</title></svelte:head>

{#if mounted}
	{#each questions as { id, name, answers } (id)}
		<p>
			{name} (<code>{id}</code>): {answers.find(_ => _.id === map.get(id))?.name}
		</p>
	{/each}
{:else}
	<Spinner size='sm' />
	Elaborando le tue risposte...
{/if}