<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import Footer from '$lib/footer/Footer.svelte';
	import Plotly from '$lib/Plotly.svelte';
	import DarkMode, { store as theme } from '$lib/DarkMode.svelte';
	import highlight from 'svelte-highlight/src/styles/monokai';
</script>

<svelte:head>
	{#if $theme === 'light'}
		<link href='https://cdn.jsdelivr.net/npm/bootswatch@5.1.3/dist/flatly/bootstrap.min.css' rel='stylesheet' />
	{:else}
		<link href='https://cdn.jsdelivr.net/npm/bootswatch@5.1.3/dist/darkly/bootstrap.min.css' rel='stylesheet' />
	{/if}

	<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.0/font/bootstrap-icons.css' />

	{@html highlight}
</svelte:head>

<div class='d-none'>
	<Plotly />
</div>

<Header />

<DarkMode />

<main class='mx-5 mt-3' style='flex: 1;'>
	<slot />
</main>

<Footer />

<style lang='scss' global>
	@namespace m url('http://www.w3.org/1998/Math/MathML');

	@font-face {
		font-family: 'Latin Modern';
		src: url('/latin_modern.woff');
		font-weight: normal;
		font-style: normal;
	}

	m|math {
		font-family: 'Latin Modern';
	}
</style>