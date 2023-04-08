<script lang="ts">
	import TechItem from '$lib/components/TechItem.svelte';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import SiPrisma from 'svelte-icons-pack/si/SiPrisma';
	import SiSqlite from 'svelte-icons-pack/si/SiSqlite';
	import SiSvelte from 'svelte-icons-pack/si/SiSvelte';
	import SiTailwindcss from 'svelte-icons-pack/si/SiTailwindcss';
	import SiTrpc from 'svelte-icons-pack/si/SiTrpc';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Learning SVELTE + TRPC</title>
</svelte:head>

<div class="m-8 text-center">
	<div class="rounded border-solid border-2 border-moonstone/100" />
	<p class="text-xl text-white font-semibold">TODO LIST CRUD USING SVELTEKIT + TRPC</p>
	<p class="text-white font-semibold">
		You are {data.isAuthenticated ? '' : 'not'} authenticated{data.username
			? `as ${data.username}`
			: ''}.
	</p>
	<div class="mt-8">
		<p class="text-white font-semibold">
			{#if data.isAuthenticated}
				You will be able to handle your todos.
			{:else}
				You need to <a class="text-moonstone" href="/login">login</a>, in order to handle todos.
				<br />
				If you doesnt have a account, <a class="text-moonstone" href="/signup">sign up</a>.
			{/if}
		</p>
	</div>
	<div class="justify-start align-middle mt-8">
		<h2 class="mb-2 text-lg font-semibold text-moonstone">Tecnologies</h2>
		<ul class="max-w-md space-y-1 text-white list-inside list-disc">
			<TechItem text="Svelte + SvelteKit" url="https://svelte.dev/" hex="svelte">
				<Icon size="24" color="#FF3C00" src={SiSvelte} />
			</TechItem>
			<TechItem text="TailwindCSS" url="https://tailwindcss.com/" hex="tailwind">
				<Icon size="24" color="#06B6D4" src={SiTailwindcss} />
			</TechItem>
			<TechItem text="TRPC" url="https://trpc.io/" hex="trpc">
				<Icon size="24" color="#398CCB" src={SiTrpc} />
			</TechItem>
			<TechItem text="Prisma" url="https://www.prisma.io" hex="prisma">
				<Icon size="24" color="#0C344B" src={SiPrisma} />
			</TechItem>
			<TechItem text="SQLite" url="https://sqlite.org/index.html" hex="sqlite">
				<Icon size="24" color="#4EACE1" src={SiSqlite} />
			</TechItem>
		</ul>
	</div>
</div>
