import { JWT_SECRET } from '$env/static/private';
import prisma from '$lib/prisma';
import { fail } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		try {
			const data = await request.formData();
			const email = data.get('email') as string;
			const password = data.get('password') as string;

			const hashedPassword = jwt.sign(password, JWT_SECRET);

			const { id, name } = await prisma.user.findFirstOrThrow({
				where: {
					email,
					passwordHash: hashedPassword
				},
				select: { id: true, name: true }
			});

			cookies.set('jwt', jwt.sign({ id, name }, JWT_SECRET), {
				path: '/',
				secure: false
			});

			return { success: true };
		} catch (error) {
			return fail(401, {
				error: 'Authentication failed'
			});
		}
	}
};
