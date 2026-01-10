<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	async function logout() {
		authClient.signOut(
			{},
			{
				onSuccess() {
					goto('/auth');
				}
			}
		);
	}
</script>

<h1 class="font-bold text-red-600">Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<p class="text-white">
	{data.user ? `Logged in as ${data.user.email}` : 'Not logged in'}
</p>

<button class="text-white" onclick={logout}> Logout </button>
