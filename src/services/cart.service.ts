// src/services/cart.service.ts
import { Cart, CartItem } from '../models/cart.model';
import { cartRepository } from '../repositories/cart.repository';
import { productService } from './product.service';

export const cartService = {
  async getMyCart(userId: number): Promise<Cart> {
    const existing = await cartRepository.findByUserId(userId);

    if (!existing) {
      const emptyCart: Cart = {
        userId,
        items: [],
        updatedAt: new Date(),
      };
      return emptyCart;
    }

    return existing;
  },

  async addItem(userId: number, productId: number, quantity: number): Promise<Cart> {
    if (quantity <= 0) {
      const error: any = new Error('La cantidad debe ser mayor que 0');
      error.status = 400;
      throw error;
    }

    const product = await productService.findById(productId);
    if (!product) {
      const error: any = new Error('Producto no encontrado');
      error.status = 404;
      throw error;
    }

    const existingCart = await cartRepository.findByUserId(userId);

    let cart: Cart = existingCart || {
      userId,
      items: [],
      updatedAt: new Date(),
    };

    const items = [...cart.items];
    const index = items.findIndex((item) => item.productId === productId);

    if (index === -1) {
      const newItem: CartItem = { productId, quantity };
      items.push(newItem);
    } else {
      items[index].quantity += quantity;
    }

    const savedCart = await cartRepository.save(userId, items);
    return savedCart;
  },

  async updateItemQuantity(
    userId: number,
    productId: number,
    quantity: number
  ): Promise<Cart> {
    const existingCart = await cartRepository.findByUserId(userId);

    if (!existingCart) {
      const error: any = new Error('No hay carrito para este usuario');
      error.status = 404;
      throw error;
    }

    const items = [...existingCart.items];
    const index = items.findIndex((item) => item.productId === productId);

    if (index === -1) {
      const error: any = new Error('El producto no está en el carrito');
      error.status = 404;
      throw error;
    }

    if (quantity <= 0) {
      items.splice(index, 1);
    } else {
      items[index].quantity = quantity;
    }

    const savedCart = await cartRepository.save(userId, items);
    return savedCart;
  },

  async removeItem(userId: number, productId: number): Promise<Cart> {
    const existingCart = await cartRepository.findByUserId(userId);

    if (!existingCart) {
      const error: any = new Error('No hay carrito para este usuario');
      error.status = 404;
      throw error;
    }

    const items = existingCart.items.filter((item) => item.productId !== productId);

    const savedCart = await cartRepository.save(userId, items);
    return savedCart;
  },

  async clearCart(userId: number): Promise<Cart> {
    const existingCart = await cartRepository.findByUserId(userId);

    let items: CartItem[] = [];

    if (!existingCart) {
      const savedCart = await cartRepository.save(userId, items);
      return savedCart;
    } else {
      const savedCart = await cartRepository.save(userId, items);
      return savedCart;
    }
  },
};
