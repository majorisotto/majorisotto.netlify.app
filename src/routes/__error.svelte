<script lang='ts'>
	import { page } from '$app/stores';
	import Highlight from '$lib/Highlight.svelte';
	import { jsonToYaml } from '$lib/utils';
</script>

{#if $page.status == 404}
	<h1>Pagina non trovata!</h1>
{:else}
	<h1>Errore (<code>{$page.status}</code>)</h1>
{/if}

<p>
	Ulteriori informazioni:
</p>

<Highlight
	lang='yaml'
	code={jsonToYaml(JSON.stringify($page.error, null, 2))}
/>