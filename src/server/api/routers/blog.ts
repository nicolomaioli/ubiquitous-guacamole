import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const blogRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      select: {
        id: true,
        title: true,
        createdAt: true,
        image: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });
  }),
  search: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.post.findMany({
      where: {
        title: {
          contains: input,
        },
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        image: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });
  }),
});
