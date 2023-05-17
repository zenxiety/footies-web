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
        label: z.string().optional(),
        description: z.string().optional(),
        options: z.string().optional(),
        picture: z.string(),
        promo: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // console.log(input.label);

      const data = await ctx.prisma.menu.create({
        data: {
          nama: input.productName,
          harga: input.price,
          deskripsi: input.description,
          options: input.options,
          gambar: input.picture,
          promo: input.promo || "0",
          kategori: input.label?.toLowerCase().trimEnd(),
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

  getMenu: protectedProcedureMerchant.query(async ({ ctx }) => {
    const data = await ctx.prisma.menu.findMany({
      where: {
        Merchant: {
          userId: ctx.session.user.id,
        },
      },
    });
    console.log(data);
    return data;
  }),

  getMenuGroupByCategory: protectedProcedureMerchant.query(async ({ ctx }) => {
    const data = await ctx.prisma.menu.findMany({
      where: {
        Merchant: {
          userId: ctx.session.user.id,
        },
      },
    });

    const kategori = data
      ?.map((item) => item.kategori)
      .filter((v, i, a) => a.indexOf(v) === i);

    const dataByCategory = kategori?.map((item) => {
      return {
        category: item,
        data: data?.filter((dataItem) => dataItem.kategori === item),
      };
    });
    return dataByCategory;
  }),

  getSpecificMenu: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const data = await ctx.prisma.menu.findUnique({
        where: {
          id: input,
        },
      });
      console.log(data);
      return data;
    }),

  updateProduct: protectedProcedureMerchant
    .input(
      z.object({
        id: z.string(),
        productName: z.string(),
        price: z.number(),
        label: z.string().optional(),
        description: z.string().optional(),
        options: z.string().optional(),
        picture: z.string(),
        promo: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.prisma.menu.update({
        where: {
          id: input.id,
        },
        data: {
          nama: input.productName,
          harga: input.price,
          deskripsi: input.description,
          options: input.options,
          gambar: input.picture,
          promo: input.promo || "0",
          kategori: input.label?.toLowerCase().trimEnd(),
        },
      });
      console.log(data);
      return data;
    }),

  deleteProduct: protectedProcedureMerchant
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.prisma.menu.delete({
        where: {
          id: input,
        },
      });
      console.log(data);
      return data;
    }),

  duplicateProduct: protectedProcedureMerchant
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.prisma.menu.findUnique({
        where: {
          id: input,
        },
      });

      if (!data) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Menu not found",
        });
      }

      const newData = await ctx.prisma.menu.create({
        data: {
          nama: data.nama + " (copy)",
          harga: data.harga,
          deskripsi: data.deskripsi,
          options: data.options,
          gambar: data.gambar,
          promo: data.promo,
          kategori: data.kategori,
          Merchant: {
            connect: {
              userId: ctx.session.user.id,
            },
          },
        },
      });
      console.log(newData);
      return newData;
    }),
});
