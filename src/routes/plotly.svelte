<script lang="ts">
	import Plotly from '$lib/Plotly.svelte';
	import type { Data, Layout } from 'plotly.js';

	import { traits, traitArray, Trait } from './quiz/spirit/data';

	const invisibleData: Data = {
		type: 'scatterpolar',
		theta: traitArray.map(x => x[1]).concat(traitArray.map(x => x[2])),
		r: new Array(traitArray.length * 2),
	};

	function makeData(extroverted: number, thoughtful: number, artful: number): Data {
		return {
			type: 'scatterpolar',
			fill: 'toself',
			theta: [traits.get(Trait.Extroverted)[extroverted >= 0 ? 0 : 1], traits.get(Trait.Thoughtful)[thoughtful >= 0 ? 0 : 1], traits.get(Trait.Artful)[artful >= 0 ? 0 : 1], traits.get(Trait.Extroverted)[extroverted >= 0 ? 0 : 1]],
			r: [Math.abs(extroverted), Math.abs(thoughtful), Math.abs(artful), Math.abs(extroverted)],
		};
	}

	let a = 3, b = 7, c = 5;

	let data: Data[];
	$: data = [
		invisibleData,
		makeData(a, b, c),
	];

	const layout: Partial<Layout> = {
		height: 500,
		showlegend: false,
	};
</script>

<input type='range' min={-10} max={10} bind:value={a} />
<input type='range' min={-10} max={10} bind:value={b} />
<input type='range' min={-10} max={10} bind:value={c} />

<Plotly data={data} {layout} />

<style lang="scss">

</style>
