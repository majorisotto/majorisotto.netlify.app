<script lang='ts'>
	import { page } from '$app/stores';
	import Highlight from '$lib/Highlight.svelte';
	import { objectToYaml, errorTitle } from '$lib/utils';
</script>

<h1>{@html errorTitle($page.status)}</h1>

<p>
	Ulteriori informazioni:
</p>

<Highlight
	lang='yaml'
	code={objectToYaml($page.error)}
/>