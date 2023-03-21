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

export const merchantRouter = createTRPCRouter({
  listProduct: protectedProcedureMerchant
    .input(
      z.object({
        productName: z.string(),
        price: z.number(),
        labels: z.array(z.string()),
        description: z.string().optional(),
        options: z.string().optional(),
        picture: z.string(),
        promo: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.prisma.menu.create({
        data: {
          nama: input.productName,
          harga: input.price,
          deskripsi: input.description,
          options: input.options,
          gambar: input.picture,
          promo: input.promo,
          kategori: input.labels,
          Merchant: {
            connect: {
              userId: ctx.session.user.id,
            },
          },
        },
      });
      console.log(data);
      return data;
    }),
});
