import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { authRouter } from "./routers/auth";
import { userRouter } from "./routers/user";
import { merchantRouter } from "./routers/merchant";
import { transactionRouter } from "./routers/transaction";
import { voucherRouter } from "./routers/voucher";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  auth: authRouter,
  user: userRouter,
  merchant: merchantRouter,
  transaction: transactionRouter,
  voucher: voucherRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
