<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let error = false;
	let emailInput: HTMLInputElement;
	let passwordInput: HTMLInputElement;

	$: returnTo = $page.url.searchParams.get('returnTo');

	$: (async () => {
		if (form?.success) {
			await invalidateAll();
			await goto(returnTo || '/');
		} else if (form?.error) {
			error = true;
		}
	})();
</script>

<div class="h-screen w-screen flex bg-gray-300">
	<div class="border-zinc-950 align-middle m-4">
		<form method="POST" use:enhance class="max-w-md m-auto">
			<label>
				Email
				<input bind:value={emailInput} type="text" name="email" required id="email" />
			</label>
			<label>
				Senha
				<input bind:value={passwordInput} type="text" name="password" required id="password" />
			</label>
			<footer>
				{#if returnTo}
					<a href={returnTo}>Cancel</a>
				{/if}
			</footer>
			<button type="submit">Login</button>
		</form>

		<dialog open={!!error}>
			<article>
				<header>Authentication failed</header>
				<p>Check your credentials again</p>
				<footer>
					<button on:click={() => (error = false)}>OK</button>
				</footer>
			</article>
		</dialog>
	</div>
</div>
