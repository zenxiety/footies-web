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
        password: z
          .string()
          .min(6)
          .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
        firstName: z.string().min(2),
        lastName: z.string().min(2),
        telepon: z.string().min(10),
        alamat: z.string().min(10),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user
        .create({
          data: {
            email: input.email.toLowerCase(),
            password: input.password,
            name: input.firstName + " " + input.lastName,
            firstName: input.firstName,
            lastName: input.lastName,
            telepon: input.telepon,
            Alamat: {
              create: {
                alamat: input.alamat,
              },
            },
            isVerified: true,
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

  googleVerification: protectedProcedure
    .input(
      z.object({
        telepon: z.string().min(10),
        alamat: z.string().min(10),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          Alamat: {
            create: {
              alamat: input.alamat,
            },
          },
          telepon: input.telepon,
          isVerified: true,
        },
      });
    }),

  registerMerchant: protectedProcedure
    .input(
      z.object({
        nama: z.string().min(2),
        alamat: z.string().min(10),
        jamBuka: z.string().min(4),
        jamTutup: z.string().min(4),
        deskripsi: z.string().min(10).nullish(),
        labels: z.array(z.string()).min(1),
        dokumen: z.string().min(10),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.user
        .update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            Merchant: {
              create: {
                nama: input.nama,
                alamat: input.alamat,
                jamBuka: input.jamBuka,
                jamTutup: input.jamTutup,
                deskripsi: input.deskripsi,
                labels: {
                  set: input.labels,
                },
                dokumen: input.dokumen,
              },
            },
          },
        })
        .catch((err) => {
          if (err instanceof PrismaClientKnownRequestError) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: ErrorCode.InternalServerError,
            });
          }
        });

      return true;
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
