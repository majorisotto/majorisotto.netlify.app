<script lang='ts'>
	import { sleep } from '$lib/utils';
	import { createEventDispatcher } from 'svelte';
	import { Form } from 'sveltestrap';
	import type { InputProps } from 'sveltestrap/src/Input';

	export let questions: string[];
	export let submitted = false;

	const dispatch = createEventDispatcher<{ submit: Map<string, string> }>();

	function map() {
		return new Map(questions.map(x => {
			const element: HTMLInputElement = document.querySelector(`#${x}`) ?? document.querySelector(`[name=${x}]:checked`);
			return [x, element?.value];
		}));
	}

	function validate(question: string): string[] {
		const questions = map();
		if (!questions.has(question)) {
			return [`Unknown question`];
		}
		if (questions.get(question) === undefined) {
			return [`Please answer this question`];
		}
		return [];
	}

	export const validateAndProps = function validateAndProps(question: string): Partial<InputProps> {
		const feedback = validate(question);
		const valid = feedback.length === 0;
		if (valid) return {
			valid: true,
		};
		else return {
			invalid: true,
			feedback,
		};
	}

	export const allValid = function allValid() {
		return questions.map(validate).every(x => x.length === 0);
	}

	async function process() {
		submitted = true;

		await sleep(0);

		dispatch('submit', map());

		await sleep(0);

		submitted = false;
	}
</script>

<svelte:options accessors />

<Form on:submit={evt => { evt.preventDefault(); console.log(evt); process(); }} disabled={submitted}>
	<slot />
</Form>