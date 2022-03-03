<script lang='ts'>
	import { store as theme } from '$lib/DarkMode.svelte';
	import { Button, Icon } from 'sveltestrap';
</script>

<Button color={$theme === 'dark' ? 'light' : 'dark'} on:click={() => (console.log('switching theme', $theme), $theme = ($theme === 'dark' ? 'light' : 'dark'), console.log('now:', $theme))}>
	<Icon name={$theme === 'dark' ? 'moon' : 'sun'} />
</Button>

<style lang='scss'>

</style>