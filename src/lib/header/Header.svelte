<script lang="ts">
	import {
		Collapse,
		Navbar,
		NavbarToggler, 
		NavbarBrand,
		Nav,
		NavItem,
		Icon,
	} from 'sveltestrap';
	import MaybeNavLink from './MaybeNavLink.svelte';
	import ThemeSwitchButton from './ThemeSwitchButton.svelte';
	import { store as theme } from '$lib/DarkMode.svelte';
	import logo from '../assets/majorisotto_t.png';

	let isOpen = false;
	const expand = 'md';
</script>

<Navbar color={$theme} {...($theme === 'dark' ? { dark: true } : { light: true })} {expand}>
	<NavbarBrand href='/'>
		<img src={logo} height={32} alt='Logo di Majorisotto' class='d-inline-block align-text-center' />
		Majorisotto
	</NavbarBrand>
	<NavbarToggler on:click={() => isOpen = !isOpen} />
	<Collapse {isOpen} navbar {expand} on:update={evt => isOpen = evt.detail}>
		<Nav class='ms-auto navbar-nav'>
			<MaybeNavLink href='/'>
				<Icon name='house' />
				Home
			</MaybeNavLink>
			<MaybeNavLink href='/about'>
				<Icon name='question-diamond' />
				Informazioni
			</MaybeNavLink>
			<MaybeNavLink href='/contact'>
				<Icon name='send' />
				Scrivici!
			</MaybeNavLink>
			<MaybeNavLink href='/blog' root='/blog'>
				<Icon name='body-text' />
				Blog
			</MaybeNavLink>
			<MaybeNavLink href='/mantecalista'>
				<Icon name='mic' />
				La Mantecalista
			</MaybeNavLink>
			<NavItem>
				<ThemeSwitchButton />
			</NavItem>
		</Nav>
	</Collapse>
</Navbar>
