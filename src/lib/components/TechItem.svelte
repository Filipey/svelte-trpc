<script lang="ts">
	export let text: string;
	export let url: string;
	export let hex: 'svelte' | 'tailwind' | 'prisma' | 'sqlite' | 'trpc';

	const colorVariants = {
		svelte: 'hover:text-svelte-main',
		tailwind: 'hover:text-tailwind-main',
		trpc: 'hover:text-trpc-main',
		prisma: 'hover:text-prisma-main',
		sqlite: 'hover:text-sqlite-main'
	};
</script>

<li class="flex text-center items-center">
	<slot />
	<p class={`p-2 text-white ${colorVariants[hex]} transition-all duration-300 font-semibold`}>
		<a target="_blank" href={url}>{text}</a>
	</p>
</li>
