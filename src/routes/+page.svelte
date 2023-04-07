<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Learning SVELTE + TRPC</title>
</svelte:head>

<div class="text-center bg-slate-600">
	<p class="text-xl">TODO LIST CRUD USING SVELTEKIT + TRPC</p>
	<p class="text-white">
		You are {data.isAuthenticated ? '' : 'not'} authenticated{data.username
			? `as ${data.username}`
			: ''}.
	</p>
	<br />
	<p class="text-white">
		{#if data.isAuthenticated}
			You will be able to handle your todos.
		{:else}
			You need to <a class="text-red" href="/login">login</a>, in order to handle todos.
		{/if}
	</p>
</div>
