import { createInnerTRPCContext } from '~/server/api/trpc';
import { createServerSideHelpers } from '@trpc/react-query/server';
import superjson from 'superjson';
import { appRouter } from '~/server/api/root';

export const helpers = createServerSideHelpers({
  router: appRouter,
  ctx: createInnerTRPCContext({}),
  transformer: superjson,
});
