import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { ErrorCode, hashPassword } from "../../../utils/auth";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  protectedProcedureMerchant,
  protectedProcedureMitra,
} from "../trpc";

export const userRouter = createTRPCRouter({
  getUserProfile: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
      include: {
        Alamat: true,
      },
    });
  }),

  getMerchantProfile: protectedProcedureMerchant.query(async ({ ctx }) => {
    return await ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
      select: { Merchant: true },
    });
  }),

  getMitraProfile: protectedProcedureMitra.query(async ({ ctx }) => {
    return await ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
      select: {
        Mitra: {
          include: {
            Kendaraan: true,
          },
        },
      },
    });
  }),
});
