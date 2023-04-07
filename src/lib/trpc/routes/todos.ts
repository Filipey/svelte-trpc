import prisma from '$lib/prisma';
import { logger } from '$lib/trpc/middleware/logger';
import { t } from '$lib/trpc/t';
import { z } from 'zod';
import { auth } from '../middleware/auth';

export const todos = t.router({
	listUserTodos: t.procedure
		.use(logger)
		.input(z.string().cuid())
		.query(({ input }) =>
			prisma.todo
				.findMany({
					select: {
						id: true,
						checked: true,
						title: true
					},
					orderBy: { createdAt: 'asc' },
					where: {
						ownerId: input
					}
				})
				.then((todos) => todos.map((todo) => ({ ...todo })))
		),

	save: t.procedure
		.use(logger)
		.use(auth)
		.input(
			z.object({
				title: z.string().min(4).max(30),
				ownerId: z.string().cuid()
			})
		)
		.mutation(async ({ input }) => {
			await prisma.todo.create({
				data: {
					checked: false,
					title: input.title,
					ownerId: input.ownerId
				}
			});
		}),

	delete: t.procedure
		.use(logger)
		.use(auth)
		.input(z.string().cuid())
		.mutation(async ({ input }) => {
			await prisma.todo.delete({
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
				title: z.string().min(4).max(30),
				checked: z.boolean()
			})
		)
		.mutation(async ({ input }) => {
			await prisma.todo.update({
				data: {
					checked: input.checked,
					title: input.title
				},
				where: {
					id: input.id
				}
			});
		})
});
