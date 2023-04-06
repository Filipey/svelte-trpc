<script lang="ts">
	export let text: string;
	export let color: 'primary' | 'secondary';
	export let action: () => void;
</script>

<button
	class={`${
		color === 'primary' ? 'bg-blue-500 hover:bg-blue-700' : 'bg-red-500 hover:bg-red-700'
	} text-white font-bold rounded transition-all duration-300`}
	on:click={action}
>
	{text}
</button>
