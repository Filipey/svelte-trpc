<script lang="ts">
	import Button from '../lib/components/Button.svelte';

	let value = 0;
	const upgradeValue = () => (value += 1);
	const downgradeValue = () => (value -= 1);
</script>

<div class="flex">
	<p class="text-black text-xl">The current value of the counter is: {value}</p>
</div>
<Button text="Increase" action={upgradeValue} color="primary" />
<Button text="Decrease" action={downgradeValue} color="secondary" />
