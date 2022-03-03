<script lang="ts">
	import Plotly, { plotlyDark, plotlyWhite } from '$lib/Plotly.svelte';
	import { range } from 'it-range';
	import type { Data, Layout } from 'plotly.js';

	function makeData(shape: 'linear' | 'spline' | 'hv' | 'vh' | 'hvh' | 'vhv'): Data {
		return {
			x: [...range(0, 101, 5)],
			y: [2, 2, 2, 2, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
			mode: 'lines+markers',
			name: `linear (${shape})`,
			line: { shape },
			type: 'scatter'
		};
	}

	const data: Data[] = [
		makeData('linear'),
		makeData('spline'),
		makeData('hv'),
		makeData('vh'),
		makeData('hvh'),
		makeData('vhv'),
	];

	const layout: Partial<Layout> = {
		legend: {
			y: 0.5,
			font: { size: 16 },
		},
		title: {
			yref: 'paper',
		},
		height: 500,
		xaxis: {
			autotick: false,
			ticks: 'outside',
			tick0: 0,
			dtick: 5,
			title: 'Percentuale (100 * punti ottenuti / punti massimi)',
			range: [0, 104],
		},
		yaxis: {
			autotick: false,
			ticks: 'outside',
			tick0: 0,
			dtick: 1,
			title: 'Voto (decimi)',
			range: [0, 10.5],
		}
	};
</script>

<Plotly data={data} {layout} />

<style lang="scss">

</style>
