<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';
	import Navbar from '$lib/components/navbar.svelte';
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

<Navbar />
