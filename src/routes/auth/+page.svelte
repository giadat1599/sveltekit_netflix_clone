<script lang="ts">
	import { goto } from '$app/navigation';
	import HeroBackground from '$lib/assets/hero.jpg';
	import Logo from '$lib/assets/logo.png';
	import { authClient } from '$lib/auth-client';
	import Input from '$lib/components/input.svelte';
	import { cn } from '$lib/utils';

	let name = $state('');
	let email = $state('');
	let password = $state('');
	let variant = $state<'login' | 'register'>('login');
	let loading = $state(false);

	function toggleVariant() {
		variant = variant === 'login' ? 'register' : 'login';
	}

	async function handleRegister() {
		loading = true;
		await authClient.signUp.email(
			{
				name,
				email,
				password
			},
			{
				onSuccess() {
					goto('/profiles');
				},
				onResponse() {
					loading = false;
				}
			}
		);
	}

	async function handleLogin() {
		loading = true;
		await authClient.signIn.email(
			{
				email,
				password
			},
			{
				onSuccess() {
					loading = false;
					goto('/profiles');
				},
				onResponse() {
					loading = false;
				}
			}
		);
	}

	async function handleSubmit() {
		if (variant === 'login') {
			await handleLogin();
		} else {
			await handleRegister();
		}
	}
</script>

<div
	class="relative size-full bg-cover bg-fixed bg-center bg-no-repeat"
	style="background-image: url({HeroBackground});"
>
	<div class="absolute inset-0 bg-black lg:opacity-50"></div>
	<div class="relative size-full">
		<nav class="px-12 py-5">
			<img alt="Logo" src={Logo} class="h-12" />
		</nav>
		<div class="flex justify-center">
			<div class="mt-2 w-full self-center rounded-md bg-black/70 p-16 lg:w-2/5 lg:max-w-md">
				<h2 class="mb-8 text-4xl font-semibold text-white">
					{variant === 'login' ? 'Sign In' : 'Create an Account'}
				</h2>
				<div class="flex flex-col gap-4">
					{#if variant === 'register'}
						<Input bind:value={name} label="Name" id="name" />
					{/if}
					<Input bind:value={email} label="Email" id="email" type="email" />
					<Input bind:value={password} label="Password" id="password" type="password" />
				</div>
				<button
					disabled={loading}
					class={cn('mt-10 w-full cursor-pointer rounded-md bg-red-600 py-3 text-white transition hover:bg-red-700', {
						'cursor-progress opacity-50': loading
					})}
					onclick={handleSubmit}
				>
					{variant === 'login' ? 'Login' : 'Sign up'}
				</button>
				<p class="mt-12 text-center text-neutral-500">
					{variant === 'login' ? 'First time using Netflix??' : 'Already have an account?'}
					<button class="ml-1 cursor-pointer text-white hover:underline" onclick={toggleVariant}>
						{variant === 'login' ? 'Create an account' : 'Login'}
					</button>
				</p>
			</div>
		</div>
	</div>
</div>
