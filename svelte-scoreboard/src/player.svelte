<script>
	import { createEventDispatcher } from 'svelte';
	
	const dispatch = createEventDispatcher();
	export let name;
	export let points;
	let showControls = false;
	
	const addPoint = () => points += 1;
	const removePoint = () => points -= 1;
	const toggleControls = () => (showControls = !showControls);
	
	const onDelete = () => dispatch('removeplayer', name);
</script>

<main>
	<div class="card">
		<h1>
			{name}
			<button class="btn" on:click={toggleControls}>
				{#if showControls} - {:else} + {/if}
			</button>
			<button on:click='{onDelete}'>Delete</button>
		</h1>
		<h3>Points: {points}</h3>
		{#if showControls}
		<button class="btn" on:click={addPoint}>+1</button>
		<button class="btn" on:click={removePoint}>-1</button>
		<input type="number" bind:value={points} />
		{/if}
	</div>
</main>

<style>
	h1 {
		color: var(--c-primary);
	}
	.card {
		border: .1rem dotted var(--c-primary);
		margin: 0 0 .5rem 0;
		padding: 2.0rem;
	}
</style>