<script lang="ts">
	type MobileMenuProps = {
		visible?: boolean;
	};

	let { visible }: MobileMenuProps = $props();
</script>

{#if visible}
	<div class="absolute top-8 left-0 flex w-56 flex-col border-2 border-gray-800 bg-black py-5">
		<div class="flex flex-col gap-4">
			<div class="px-3 text-center text-white hover:underline">Home</div>
			<div class="px-3 text-center text-white hover:underline">Series</div>
			<div class="px-3 text-center text-white hover:underline">Films</div>
			<div class="px-3 text-center text-white hover:underline">New & Popular</div>
			<div class="px-3 text-center text-white hover:underline">My List</div>
			<div class="px-3 text-center text-white hover:underline">Browse by languages</div>
		</div>
	</div>
{/if}
