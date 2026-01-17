<script lang="ts">
	import DefaultBlue from '$lib/assets/default-blue.png';
	import { authClient } from '$lib/auth-client';
	import type { User } from 'better-auth';

	type AccountMenuProps = {
		visible?: boolean;
		user: User;
	};

	let { visible, user }: AccountMenuProps = $props();

	function logout() {
		authClient.signOut(
			{},
			{
				onSuccess() {
					location.reload();
				}
			}
		);
	}
</script>

{#if visible}
	<div class="absolute top-14 right-0 flex w-56 flex-col border-2 border-gray-800 bg-black py-5">
		<div class="flex flex-col gap-3">
			<div class="group/item flex w-full items-center gap-3 px-3">
				<img class="w-8 rounded-md" src={DefaultBlue} alt="account" />
				<p class="text-sm text-white group-hover/item:underline">{user.name}</p>
			</div>
			<hr class="my-4 h-px border-0 bg-gray-600" />
			<button class="px-3 text-center text-sm text-white hover:underline" onclick={logout}>
				Sign out of Netflix
			</button>
		</div>
	</div>
{/if}
