import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { ErrorCode } from "../../../utils/auth";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
        name: z.string().min(2),
        telepon: z.string().min(10),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user
        .create({
          data: {
            email: input.email.toLowerCase(),
            password: input.password,
            name: input.name,
            telepon: input.telepon,
          },
        })
        .catch((err) => {
          if (err instanceof PrismaClientKnownRequestError) {
            if (err.code === "P2002")
              throw new TRPCError({
                code: "BAD_REQUEST",
                message: ErrorCode.EmailAlreadyExists,
              });

            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: ErrorCode.InternalServerError,
            });
          }
        });

      return user;
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
