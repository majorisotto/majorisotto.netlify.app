<script lang='ts'>
	import { ButtonGroup, Input, Label } from 'sveltestrap';
	import type { Answer, Style } from './data';

	export let id: string;
	export let label: string;
	export let answers: Answer[];
	export let style: Style = 'plain';
	export let value: string = undefined;

	function classFor(n: string) {
		function strength(n: string) {
			return Math.abs(Number.parseInt(n)) as unknown as 0 | 1 | 2 | 3;
		}
	
		function strengthClass(x: 0 | 1 | 2 | 3) {
			switch (x) {
				case 0: return 'neutral';
				case 1: return 'slight';
				case 2: return 'normal'
				case 3: return 'very';
			}
		}

		function orientation(n: string) {
			return Math.sign(Number.parseInt(n)) as unknown as -1 | 0 | 1;
		}

		function orientationClass(x: -1 | 0 | 1) {
			switch (x) {
				case -1: return 'negative';
				case 0: return 'neutral';
				case 1: return 'positive';
			}
		}

		return strengthClass(strength(n)) + ' ' + orientationClass(orientation(n));
	}
</script>

<span class='neutral slight normal very' />

{#if style === 'scale'}
	<Label for={id}>{label}</Label>
	<br />
	<ButtonGroup>
		{#each answers as answer}
			<input class='btn-check' name={id} type='radio' value={answer.id} bind:group={value} autocomplete='off' id={id + '$' + answer.id} />
			<label class='btn btn-outline-primary' for={id + '$' + answer.id}>{answer.name}</label>
		{/each}
	</ButtonGroup>
{:else if style === 'stars'}
	<Label for={id}>{label}</Label>
	<br />
	<div class='d-inline-flex flex-row-reverse rating'>
		{#each answers.slice().reverse() as answer}
			<input class='d-none' name={id} type='radio' value={answer.id} bind:group={value} id={id + '$' + answer.id} />
			<label class='m-1 d-inline-block' for={id + '$' + answer.id} title={answer.id + ' Stars'} />
		{/each}
	</div>
{:else if style === 'agree'}
	<Label for={id}>{label}</Label>
	<br />
	<div class='d-inline-flex align-items-center agree'>
		{#each answers as answer}
			<Input name={id} type='radio' value={answer.id} title={answer.name} bind:group={value} class={'d-inline-block ' + classFor(answer.id)} />
			<!-- <input class='btn-check' name={id} type='radio' value={answer.id} bind:group={value} autocomplete='off' id={id + '$' + answer.id} />
			<label class={'btn btn-outline-primary ' + strengthName(strength(answer.id))} for={id + '$' + answer.id} title={answer.name}>&bull;</label> -->
		{/each}
	</div>
{:else if style === 'plain'}
	<Label for={id}>{label}</Label>
	{#each answers as answer}
		<Input name={id} type='radio' value={answer.id} label={answer.name} bind:group={value} />
	{/each}
{:else}
	Unknown question style <code>{style}</code>
{/if}

<style lang='scss'>
	.rating {
		& > label {
			&::before {
				font-family: 'bootstrap-icons';
				content: '\f588';
			}

			color: var(--bs-secondary);
		}

		& > input:checked ~ label,
		&:not(:checked) > label:hover,
		&:not(:checked) > label:hover ~ label {
			color: var(--bs-yellow);

			&::before {
				content: '\f586';
			}
		}

		& > input:checked + label:hover,
		& > input:checked ~ label:hover,
		& > label:hover ~ input:checked ~ label,
		& > input:checked ~ label:hover ~ label {
			color: var(--bs-orange);
		}
	}

	@mixin transform-box($size) {
		transform: scale($size);
		margin: 0 auto calc(0);
	}

	@mixin bordered($color) {
		border-color: $color;
		border-width: 1px;
		border-style: solid;

		margin-left: 0;
		padding-left: 0;
	}

	:global(.agree) {
		:global(.form-check) {
			padding-left: 0;
			min-height: initial;
			height: fit-content;
			margin-right: 5px;
		}

		:global(.very) {
			font-size: 2em;
		}

		:global(.normal) {
			font-size: 1.5em;
		}

		:global(.slight) {
			font-size: 1em;
		}

		:global(.neutral) {
			font-size: .85em;
		}

		:global(.positive > input) {
			&:checked { background-color: var(--bs-success) };
			@include bordered(var(--bs-success));
		}

		:global(.neutral > input) {
			&:checked { background-color: var(--bs-secondary) };
			@include bordered(var(--bs-secondary));
		}

		:global(.negative > input) {
			&:checked { background-color: var(--bs-danger) };
			@include bordered(var(--bs-danger));
		}
	}
</style>