import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const voucherRouter = createTRPCRouter({
  createVoucher: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        value: z.number(),
        type: z.string(),
        expired: z.string(),
        status: z.string(),
        kode: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.prisma.voucher.create({
        data: {
          ...input,
          kode: input.kode ?? Math.floor(Math.random() * 1000000).toString(),
        },
      });

      return data;
    }),

  validateVoucher: protectedProcedure
    .input(z.object({ kode: z.string() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.prisma.voucher.findUnique({
        where: {
          kode: input.kode,
        },
      });
      if (!data) {
        return {
          status: false,
          message: "voucher not found",
        };
      }

      return {
        status: true,
        message: "voucher found",
      };
    }),
});
