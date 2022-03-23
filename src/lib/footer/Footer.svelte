<script lang='ts'>
	import { store as theme } from '$lib/DarkMode.svelte';
	import { Icon } from 'sveltestrap';
</script>

<footer class='text-center text-lg-start bg-{$theme} text-muted'>
	<section class='d-flex justify-content-center justify-content-md-between p-4 border-bottom'>
		<div class='me-5 d-none d-lg-block'>
			
		</div>

		<div class='icon-container'>
			<!-- 👀
			<a href='#' class='text-reset'>
				<Icon name='flag-fill' class='rainbow-flag' />
			</a>
			<a href='#' class='text-reset'>
				<Icon name='suit-spade' />
			</a>
			-->
			<a href='mailto:majorisotto@gmail.com' class='text-reset'>
				<Icon name='envelope-paper-heart' />
			</a>
			<a href='https://instagram.com/majorisotto' class='text-reset'>
				<Icon name='instagram' />
			</a>
		</div>
	</section>
</footer>

<style lang='scss'>
	@use "sass:math";

	$flag-wave: math.div(9px, 16px);

	:global(.rainbow-flag) {
		background-image: linear-gradient(.5turn, 
			var(--bs-red) 10% * $flag-wave,
			var(--bs-orange) 20% * $flag-wave,
			var(--bs-yellow) 33.33% * $flag-wave,
			var(--bs-green) 50% * $flag-wave,
			var(--bs-cyan) 66.67% * $flag-wave,
			var(--bs-blue) 83% * $flag-wave,
			var(--bs-indigo) 100% * $flag-wave 110% * $flag-wave,
			var(--bs-gray) 110% * $flag-wave);
		background-clip: text;
		color: transparent !important;
		-webkit-text-fill-color: transparent;
	}

	.icon-container a {
		margin-left: 10px;
	}
</style>