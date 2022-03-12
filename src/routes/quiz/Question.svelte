<script lang='ts'>
	import { ButtonGroup, Input, Label } from 'sveltestrap';
	import type { Answer, Style } from './questions';

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

{#if false}
	<!-- Stuff needed to confirm style existence -->
	<span class='agree'><span class='form-check neutral slight normal very positive negative'><input /></span></span>
{/if}

<Label for={id}><h5>{label}</h5></Label>
{#if style === 'scale'}
	<br />
	<ButtonGroup>
		{#each answers as answer}
			<input class='btn-check' name={id} type='radio' value={answer.id} bind:group={value} autocomplete='off' id={id + '$' + answer.id} />
			<label class='btn btn-outline-primary' for={id + '$' + answer.id}>{answer.name}</label>
		{/each}
	</ButtonGroup>
{:else if style === 'stars'}
	<br />
	<div class='d-inline-flex flex-row-reverse rating'>
		{#each answers.slice().reverse() as answer}
			<input class='d-none' name={id} type='radio' value={answer.id} bind:group={value} id={id + '$' + answer.id} />
			<label class='m-1 d-inline-block' for={id + '$' + answer.id} title={answer.id + ' Stars'} />
		{/each}
	</div>
{:else if style === 'agree'}
	<br />
	<div class='d-inline-flex align-items-center agree'>
		<h6 class='text-success m-2'>Approvo</h6>
		{#each answers as answer}
			<div class:form-check={true} class={classFor(answer.id)}>
				<input
					name={id}
					type='radio'
					value={answer.id}
					title={answer.name}
					bind:group={value}
					class:form-check-input={true}
				/>
			</div>
			<!-- <input class='btn-check' name={id} type='radio' value={answer.id} bind:group={value} autocomplete='off' id={id + '$' + answer.id} />
			<label class={'btn btn-outline-primary ' + strengthName(strength(answer.id))} for={id + '$' + answer.id} title={answer.name}>&bull;</label> -->
		{/each}
		<h6 class='text-danger m-2'>Dispprovo</h6>
	</div>
{:else if style === 'plain'}
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

	@mixin bordered($color) {
		border-color: $color;
		border-width: 1px;
		border-style: solid;

		margin-left: 0;
		padding-left: 0;
	}

	@mixin colored-input($color) {
		& > input {
			&:checked {
				background-color: $color;
			}
			@include bordered($color);
		}
		color: $color;
	}

	.agree {
		.form-check {
			padding-left: 0;
			min-height: initial;
			height: fit-content;
			margin-bottom: 0;

			&:last-of-type {
				margin-right: 0;
			}

			&:not(:last-of-type) {
				margin-right: 5px;
			}

			input {
				margin-top: 0;
			}
		}

		.very {
			font-size: 1.5em;
		}

		.normal {
			font-size: 1.25em;
		}

		.slight {
			font-size: 1em;
		}

		.neutral {
			font-size: .85em;
		}

		.positive {
			@include colored-input(var(--bs-success));
		}

		.neutral {
			@include colored-input(var(--bs-secondary));
		}

		.negative {
			@include colored-input(var(--bs-danger));
		}
	}
</style>