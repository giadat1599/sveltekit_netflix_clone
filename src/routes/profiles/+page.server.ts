import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.user?.id) {
		throw redirect(302, '/auth');
	}

	return {
		user: locals.user
	};
}
