// src/repositories/order.repository.ts
import { prisma } from '../config/prisma';
import { Order, OrderItem, OrderStatus } from '../models/order.model';

export const orderRepository = {
  async create(
    userId: number,
    items: OrderItem[],
    total: number
  ): Promise<Order> {
    return prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId,
          total,
          status: 'pending', 
        },
      });

      
      if (items.length > 0) {
        await tx.orderItem.createMany({
          data: items.map((item) => ({
            orderId: order.id,
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            subtotal: item.subtotal,
          })),
        });
      }

      
      const fullOrder = await tx.order.findUnique({
        where: { id: order.id },
        include: { items: true },
      });

      if (!fullOrder) {
        throw new Error('Error al crear la orden');
      }

      const mappedItems: OrderItem[] = fullOrder.items.map((i) => ({
        productId: i.productId,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        subtotal: i.subtotal,
      }));

      const result: Order = {
        id: fullOrder.id,
        userId: fullOrder.userId,
        items: mappedItems,
        total: fullOrder.total,
        status: fullOrder.status as OrderStatus,
        createdAt: fullOrder.createdAt,
      };

      return result;
    });
  },

  async findByUserId(userId: number): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });

    return orders.map((o) => {
      const items: OrderItem[] = o.items.map((i) => ({
        productId: i.productId,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        subtotal: i.subtotal,
      }));

      const mapped: Order = {
        id: o.id,
        userId: o.userId,
        items,
        total: o.total,
        status: o.status as OrderStatus,
        createdAt: o.createdAt,
      };

      return mapped;
    });
  },
};
