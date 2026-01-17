<script lang="ts">
	import Billboard from '$lib/components/billboard.svelte';
	import Navbar from '$lib/components/navbar.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Navbar user={data.user} />
<Billboard />
