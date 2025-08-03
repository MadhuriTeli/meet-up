import { createTRPCReact } from '@trpc/react-query';
import { AppRouter } from '@advanced-react/server';

export const trpc = createTRPCReact<AppRouter>();