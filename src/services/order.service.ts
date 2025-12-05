import { Order, OrderItem } from '../models/order.model';
// import { readOrdersFromFile, writeOrdersToFile } from '../repositories/order.file.repo';
import { cartService } from './cart.service';
import { productService } from './product.service';
import { orderRepository } from '../repositories/order.repository';

export const orderService = {
  async createOrderFromCart(userId: number): Promise<Order> {
    const cart = await cartService.getMyCart(userId);

    if (!cart.items || cart.items.length === 0) {
      const error: any = new Error('El carrito está vacío');
      error.status = 400;
      throw error;
    }

    const orderItems: OrderItem[] = [];

    for (const cartItem of cart.items) {
      const product = await productService.findById(cartItem.productId);

      if (!product) {
        const error: any = new Error(
          `El producto con id ${cartItem.productId} ya no está disponible`
        );
        error.status = 400;
        throw error;
      }

      const price = product.price;
      const quantity = cartItem.quantity;
      const subtotal = price * quantity;

      const orderItem: OrderItem = {
        productId: product.id,
        name: product.name,
        price,
        quantity,
        subtotal,
      };

      orderItems.push(orderItem);
    }

    const total = orderItems.reduce((acc, item) => acc + item.subtotal, 0);

    const newOrder = await orderRepository.create(userId, orderItems, total);

    await cartService.clearCart(userId);

    return newOrder;
  },

  async getMyOrders(userId: number): Promise<Order[]> {
    const userOrders = await orderRepository.findByUserId(userId);
    return userOrders;
  },
};
