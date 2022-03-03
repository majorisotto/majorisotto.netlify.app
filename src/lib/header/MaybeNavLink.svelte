<script lang='ts'>
	import { page } from '$app/stores';
	import { NavItem, NavLink } from 'sveltestrap';

	export let href: string;
</script>

{#if $page.url.pathname === href.replace(/#[\w\W]*$/, '')}
<NavItem {...$$restProps} active>
	<NavLink class='ps-0 pe-4' disabled active {href} {...$$restProps}>
		<slot />
	</NavLink>
</NavItem>
{:else}
<NavItem {...$$restProps}>
	<NavLink class='ps-0 pe-4' {href} {...$$restProps}>
		<slot />
	</NavLink>
</NavItem>
{/if}

<style lang='scss'>
	
</style>

