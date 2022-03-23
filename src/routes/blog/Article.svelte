<script lang='ts'>
	export let title: string;
	export let subtitle: string | undefined = undefined;
	/**
	 * `[y, m, d]`
	 */
	export let date: [number, number, number];
	export let authors: string[];
</script>

<svelte:head><title>{title}</title></svelte:head>

<article>
	<h1>{title}</h1>
	{#if subtitle}<h4>{subtitle}</h4>{/if}
	<h6 class='text-muted'>{date[0]}-{date[1].toString().padStart(2, '0')}-{date[2].toString().padStart(2, '0')}, di {authors.join(', ')}</h6>

	<hr class='mx-5 my-3' />

	<slot />
</article>