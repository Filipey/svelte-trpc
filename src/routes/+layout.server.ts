import { JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	try {
		const { name: username } = jwt.verify(cookies.get('jwt') || '', JWT_SECRET) as { name: string };
		return { isAuthenticated: true, username };
	} catch (error) {
		return { isAuthenticated: false, username: '' };
	}
};
