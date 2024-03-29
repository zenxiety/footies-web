import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  protectedProcedureMerchant,
  protectedProcedureMitra,
} from "../trpc";
import { TRPCError } from "@trpc/server";

export const transactionRouter = createTRPCRouter({
  getOrderMerchant: protectedProcedureMerchant.query(async ({ ctx }) => {
    const data = await ctx.prisma.order.findMany({
      where: {
        Merchant: {
          userId: ctx.session.user.id,
        },
      },
      include: {
        User: true,
        Cart: {
          include: {
            CartMenu: {
              include: {
                Menu: true,
              },
            },
          },
        },
      },
    });

    return data;
  }),

  getOrderMitra: protectedProcedureMitra.query(async ({ ctx }) => {
    const data = await ctx.prisma.order.findMany({
      where: {
        status: "accepted",
        merchantId: {
          not: null,
        },
      },
      include: {
        Merchant: true,
        User: {
          include: {
            Alamat: true,
          },
        },
        Cart: {
          include: {
            CartMenu: {
              include: {
                Menu: true,
              },
            },
          },
        },
      },
    });

    return data;
  }),

  getOrder: protectedProcedure
    .input(
      z.object({
        orderId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.prisma.order.findUnique({
        where: {
          id: input.orderId,
        },
        include: {
          Mitra: {
            include: {
              user: {
                select: {
                  image: true,
                  name: true,
                },
              },
              Kendaraan: {
                select: {
                  platNomor: true,
                },
              },
            },
          },
          User: {
            include: {
              Alamat: true,
            },
          },
          Merchant: true,
          Cart: {
            include: {
              CartMenu: {
                include: {
                  Menu: true,
                },
              },
            },
          },
        },
      });

      return data;
    }),

  finishOrderMitra: protectedProcedureMitra
    .input(z.object({ orderId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.prisma.order.update({
        where: {
          id: input.orderId,
        },
        data: {
          status: "done",
        },
      });

      if (data.MetodePembayaran === "CASH") {
        await ctx.prisma.user.update({
          where: {
            id: data.userId,
          },
          data: {
            isOrder: false,
          },
        });
      }

      return data;
    }),

  acceptOrderMerchant: protectedProcedureMerchant
    .input(z.object({ orderId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.prisma.order.update({
        where: {
          id: input.orderId,
        },
        data: {
          status: "accepted",
        },
      });

      return data;
    }),

  acceptOrderMitra: protectedProcedureMitra
    .input(z.object({ orderId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const mitraId = await ctx.prisma.mitra.findUnique({
        where: {
          userId: ctx.session.user.id,
        },
      });

      const data = await ctx.prisma.order.update({
        where: {
          id: input.orderId,
        },
        data: {
          mitraId: mitraId?.id,
        },
      });

      return data;
    }),

  createOrder: protectedProcedure
    .input(
      z.object({
        mitraId: z.string(),
        MetodePembayaran: z.enum(["CASH", "WALLET"]),
        total: z.number(),
        cartId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // check if user isOrder
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });

      if (user?.isOrder) {
        throw new Error("User sudah memiliki order");
      }

      // TODO: USE TRANSACTION
      if (input.MetodePembayaran === "WALLET") {
        const user = await ctx.prisma.user.findUnique({
          where: {
            id: ctx.session.user.id,
          },
        });

        if (!user) throw new Error("User tidak ditemukan");

        if (user.saldo < input.total) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Saldo tidak cukup",
          });
        }

        await ctx.prisma.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            saldo: user.saldo - input.total,
          },
        });
      }

      const data = await ctx.prisma.order.create({
        data: {
          userId: ctx.session.user.id,
          MetodePembayaran: input.MetodePembayaran,
          total: input.total,
          Cart: {
            connect: {
              id: input.cartId,
            },
          },
          merchantId: input.mitraId,
          status: "pending",
        },
      });

      if (input.MetodePembayaran === "CASH") {
        await ctx.prisma.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            isOrder: true,
          },
        });
      }

      return data;
    }),

  getCart: protectedProcedure
    .input(z.object({ mitraId: z.string() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.prisma.cart.findFirst({
        where: {
          userId: ctx.session.user.id,
          merchantId: input.mitraId,
          orderId: null,
        },
        include: {
          CartMenu: {
            include: {
              Menu: true,
            },
          },
          user: {
            include: {
              Alamat: true,
            },
          },
          merchant: {
            select: {
              alamat: true,
              nama: true,
            },
          },
        },
      });

      return data;
    }),

  addToCart: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
        add: z.boolean().optional(),
        merchantId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const isAlreadyInCart = await ctx.prisma.cart.findFirst({
        where: {
          userId: ctx.session.user.id,
          merchantId: input.merchantId,
          orderId: null,
        },
        include: {
          CartMenu: {
            where: {
              menuId: input.productId,
            },
          },
        },
      });

      let data;

      if (isAlreadyInCart && isAlreadyInCart.CartMenu.length > 0) {
        data = await ctx.prisma.cartMenu.update({
          where: {
            cartId_menuId: {
              cartId: isAlreadyInCart.id,
              menuId: input.productId,
            },
          },
          data: {
            qty: (isAlreadyInCart.CartMenu[0]?.qty || 0) + (input.add ? 1 : -1),
          },
        });
      } else if (isAlreadyInCart) {
        data = await ctx.prisma.cartMenu.create({
          data: {
            qty: 1,
            menuId: input.productId,
            cartId: isAlreadyInCart.id,
          },
        });
      } else {
        data = await ctx.prisma.cart.create({
          data: {
            userId: ctx.session.user.id,
            CartMenu: {
              create: {
                qty: 1,
                menuId: input.productId,
              },
            },
            merchantId: input.merchantId,
          },
        });
      }

      return data;
    }),
});
