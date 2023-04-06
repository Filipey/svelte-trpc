import { JWT_SECRET } from '$env/static/private';
import type { RequestEvent } from '@sveltejs/kit';
import type { inferAsyncReturnType } from '@trpc/server';
import jwt from 'jsonwebtoken';

export async function createContext(e: RequestEvent) {
	try {
		const token = e.request.headers.get('Authorization')?.replace('Bearer ', '');

		const { id: userId } = jwt.verify(token || '', JWT_SECRET) as {
			id: string;
		};

		return { userId };
	} catch {
		return { userId: '' };
	}
}

export type Context = inferAsyncReturnType<typeof createContext>;
