<script context='module' lang='ts'>
	import { writable } from 'svelte/store';

	export const store = writable<'dark' | 'light'>('dark');
	export const key = 'theme';

	export function validTheme(theme: string): theme is ('dark' | 'light') {
		return theme === 'dark' || theme === 'light';
	}
</script>

<script lang='ts'>
	import { onMount } from 'svelte';

	const scheme = '(prefers-color-scheme: dark)';

	const mediaChange = (evt: MediaQueryListEvent) => store.set(evt.matches ? 'dark' : 'light');

	onMount(() => {
		const darkMode = window.matchMedia(scheme);
		const persisted = localStorage.getItem(key);

		if (validTheme(persisted))
			store.set(persisted);
		else if (darkMode.matches)
			store.set('dark');
		else
			store.set('light');

		darkMode.addEventListener('change', mediaChange);

		const unsubscribe = store.subscribe(theme => {
			console.log('now', theme);
			if (validTheme(theme)) {
				localStorage.setItem(key, theme);
			}
		});

		return () => { 
			unsubscribe();
			darkMode.removeEventListener('change', mediaChange); 
		}
	});

</script>