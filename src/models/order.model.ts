export type OrderStatus = 'pending' | 'paid' | 'cancelled';

export interface OrderItem {
  productId: number;
  name: string;       
  price: number;     
  quantity: number;
  subtotal: number;  // price * quantity
}

export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
}
