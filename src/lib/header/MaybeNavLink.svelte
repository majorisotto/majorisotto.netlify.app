<script lang='ts'>
	import { page } from '$app/stores';
	import { NavItem, NavLink } from 'sveltestrap';

	export let href: string;
	export let root: string | undefined = undefined;
</script>

<NavItem {...$$restProps} active={root ? $page.url.pathname.startsWith(root) : $page.url.pathname === href.replace(/#[\w\W]*$/, '')}>
	<NavLink class='ps-0 pe-4' disabled={$page.url.pathname === href.replace(/#[\w\W]*$/, '')} active={root ? $page.url.pathname.startsWith(root) : $page.url.pathname === href.replace(/#[\w\W]*$/, '')} {href} {...$$restProps}>
		<slot />
	</NavLink>
</NavItem>