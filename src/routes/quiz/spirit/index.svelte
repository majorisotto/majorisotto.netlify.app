<script lang='ts'>
	import { Button, Form, FormGroup } from 'sveltestrap';
	import questions from './data';
	import Question from './Question.svelte';
	import { onMount } from 'svelte';

	let mounted = false;

	const qs = questions.map(q => ({ ...q, answer: undefined as unknown as string }));

	onMount(() => mounted = true);

	function valid() {
		return qs.every(({ answer }) => answer !== undefined && answer !== null);
	}

	function submitted(event: SubmitEvent) {
		console.log(event);
		console.log(qs);

		if (!valid()) {
			console.log('invalid!');
			event.preventDefault();
		}
	}
</script>

{#if mounted}
	<Form on:submit={submitted} action='/quiz/spirit/submit' method='get'>
		{#each qs as q (q.id)}
			<FormGroup>
				<Question id={q.id} label={q.name} style={q.style} answers={q.answers} bind:value={q.answer} />
			</FormGroup>
		{/each}
		<Button type='submit'>Submit</Button>
	</Form>
{/if}