import { JWT_SECRET } from '$env/static/private';
import prisma from '$lib/prisma';
import { auth } from '$lib/trpc/middleware/auth';
import { logger } from '$lib/trpc/middleware/logger';
import { t } from '$lib/trpc/t';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

export const users = t.router({
	list: t.procedure
		.use(logger)
		.input(z.string().optional())
		.query(({ input }) =>
			prisma.user
				.findMany({
					select: {
						id: true,
						email: true,
						name: true,
						_count: {
							select: {
								todos: true
							}
						}
					},
					orderBy: { updatedAt: 'desc' },
					where: input
						? {
								OR: [
									{
										name: {
											contains: input
										},
										email: {
											contains: input
										}
									}
								]
						  }
						: undefined
				})
				.then((users) => users.map((user) => ({ ...user })))
		),

	save: t.procedure
		.use(logger)
		.use(auth)
		.input(
			z.object({
				id: z.string().nullable(),
				name: z.string().min(3).max(50),
				email: z.string().email(),
				password: z.string().min(8).max(30)
			})
		)
		.mutation(async ({ input }) => {
			await prisma.user.create({
				data: {
					name: input.name,
					email: input.email,
					passwordHash: jwt.sign(input.password, JWT_SECRET)
				}
			});
		}),

	delete: t.procedure
		.use(logger)
		.use(auth)
		.input(z.string().cuid())
		.mutation(async ({ input }) => {
			await prisma.user.delete({
				where: {
					id: input
				}
			});
		}),

	update: t.procedure
		.use(logger)
		.use(auth)
		.input(
			z.object({
				id: z.string().cuid(),
				name: z.string().min(3).max(50).optional(),
				email: z.string().email().optional()
			})
		)
		.mutation(async ({ input }) => {
			await prisma.user.update({
				data: {
					name: input.name,
					email: input.email
				},
				where: {
					id: input.id
				}
			});
		})
});
