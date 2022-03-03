<script lang='ts'>
	import Highlight, { LanguageName } from '$lib/Highlight.svelte';
	import { Input } from 'sveltestrap';

	let lang: LanguageName = 'plaintext';
	let code: string = '';
</script>

<Input type='text' bind:value={lang} />

<Input type='textarea' bind:value={code} />

<Highlight {lang} {code} />

<style lang='scss'>

</style>