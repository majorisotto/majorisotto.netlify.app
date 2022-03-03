<script lang='ts'>
	import { store as theme } from '$lib/DarkMode.svelte';
	import { Icon } from 'sveltestrap';
</script>

<footer class={`text-center text-lg-start bg-${$theme} text-muted`}>
	<section class='d-flex justify-content-center justify-content-md-between p-4 border-bottom'>
		<div class='me-5 d-none d-lg-block'>
			
		</div>

		<div>
			<a href='https://instagram.com/majorisotto' class='text-reset'>
				<Icon name='instagram' />
			</a>
		</div>
	</section>
</footer>