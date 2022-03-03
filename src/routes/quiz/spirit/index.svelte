<script lang='ts'>
	import { Button, Form, FormGroup, Input, Label } from 'sveltestrap';
	import { names, objectQuestions } from './data.ts';

	function valid() {
		return names.every(name => document.querySelector(`[name=${name}]:checked`));
	}

	function submitted(event: SubmitEvent) {
		console.log(event);

		if (!valid()) event.preventDefault();
	}
</script>

<Form on:submit={submitted} action='/quiz/spirit/submit' method='get'>
	{#each objectQuestions as { id, name, answers } (id)}
		<FormGroup>
			<Label for={id}>{name}</Label>
			{#each answers as answer (id + '$' + answer.id)}
				<Input name={id} type='radio' value={answer.id} label={answer.name} />
			{/each}
		</FormGroup>
	{/each}
	<Button type='submit'>Submit</Button>
</Form>

<style lang='scss'>

</style>