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

  getRecommendedRestaurant: protectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.prisma.merchant.findMany({
      take: 10,
      where: {
        Menu: {
          some: {},
        },
      },
      include: {
        Menu: {
          take: 1,
          select: {
            gambar: true,
          },
        },
      },
    });

    return data;
  }),

  searchProductandMerchant: protectedProcedure
    .input(
      z.object({
        search: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.prisma.merchant.findMany({
        where: {
          Menu: {
            some: {},
          },
          OR: [
            {
              nama: {
                contains: input.search,
                mode: "insensitive",
              },
            },
            {
              Menu: {
                some: {
                  nama: {
                    contains: input.search,
                    mode: "insensitive",
                  },
                },
              },
            },
          ],
        },
      });

      return data;
    }),

  getSpecificMerchant: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.prisma.merchant.findUnique({
        include: {
          Menu: true,
        },
        where: {
          id: input.id,
        },
      });

      return data;
    }),
});
