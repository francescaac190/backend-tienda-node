// src/repositories/cart.repository.ts
import { prisma } from '../config/prisma';
import { Cart, CartItem } from '../models/cart.model';

export const cartRepository = {
  async findByUserId(userId: number): Promise<Cart | null> {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });

    if (!cart) return null;

    const items: CartItem[] = cart.items.map((i) => ({
      productId: i.productId,
      quantity: i.quantity,
    }));

    return {
      userId: cart.userId,
      items,
      updatedAt: cart.updatedAt,
    };
  },

  async save(userId: number, items: CartItem[]): Promise<Cart> {
    return prisma.$transaction(async (tx) => {
      const cartRecord = await tx.cart.upsert({
        where: { userId },
        update: {},
        create: {
          userId,
        },
      });

      await tx.cartItem.deleteMany({
        where: { cartId: cartRecord.id },
      });

      if (items.length > 0) {
        await tx.cartItem.createMany({
          data: items.map((item) => ({
            cartId: cartRecord.id,
            productId: item.productId,
            quantity: item.quantity,
          })),
        });
      }

      const updated = await tx.cart.findUnique({
        where: { id: cartRecord.id },
        include: { items: true },
      });

      if (!updated) {
        return {
          userId,
          items: [],
          updatedAt: new Date(),
        };
      }

      const mappedItems: CartItem[] = updated.items.map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
      }));

      return {
        userId: updated.userId,
        items: mappedItems,
        updatedAt: updated.updatedAt,
      };
    });
  },
};
