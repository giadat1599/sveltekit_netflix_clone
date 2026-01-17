<script lang="ts">
	import Logo from '$lib/assets/logo.png';
	import DefaultBlue from '$lib/assets/default-blue.png';
	import MobileMenu from './mobile-menu.svelte';
	import NavbarItem from './navbar-item.svelte';
	import ChevronDownIcon from 'lucide-svelte/icons/chevron-down';
	import SearchIcon from 'lucide-svelte/icons/search';
	import BellIcon from 'lucide-svelte/icons/bell';
	import AccountMenu from './account-menu.svelte';
	import { cn } from '$lib/utils';
	import type { User } from 'better-auth';

	type NavbarProps = {
		user: User;
	};

	const TOP_OFFSET = 66;
	let showMobileMenu = $state(false);
	let showAccountMenu = $state(false);
	let showBackground = $state(false);

	let { user }: NavbarProps = $props();
</script>

<svelte:window on:scroll={() => (showBackground = window.scrollY >= TOP_OFFSET)} />

<nav class="fixed z-40 w-full">
	<div class={cn('flex items-center px-4 py-6 transition duration-500 md:px-16', showBackground && 'bg-zinc-900/90')}>
		<img class="h-4 lg:h-7" alt="Logo" src={Logo} />
		<div class="ml-8 hidden flex-row gap-7 lg:flex">
			<NavbarItem label="Home" />
			<NavbarItem label="Series" />
			<NavbarItem label="Films" />
			<NavbarItem label="New & Popular" />
			<NavbarItem label="My List" />
			<NavbarItem label="Browse by languages" />
		</div>
		<button
			class="relative ml-8 flex cursor-pointer items-center gap-2 lg:hidden"
			onclick={() => (showMobileMenu = !showMobileMenu)}
		>
			<p class="text-sm text-white">Browse</p>
			<ChevronDownIcon class={cn('text-white transition', showMobileMenu && 'rotate-180')} />
			<MobileMenu visible={showMobileMenu} />
		</button>
		<div class="ml-auto flex items-center gap-7">
			<div class="cursor-pointer text-gray-200 transition hover:text-gray-300"><SearchIcon /></div>
			<div class="cursor-pointer text-gray-200 transition hover:text-gray-300"><BellIcon /></div>
			<button
				class="relative flex cursor-pointer items-center gap-2"
				onclick={() => (showAccountMenu = !showAccountMenu)}
			>
				<div class="size-6 overflow-hidden rounded-md lg:size-10">
					<img src={DefaultBlue} alt="account" />
				</div>
				<ChevronDownIcon class={cn('text-white transition', showAccountMenu && 'rotate-180')} />
				<AccountMenu visible={showAccountMenu} {user} />
			</button>
		</div>
	</div>
</nav>
