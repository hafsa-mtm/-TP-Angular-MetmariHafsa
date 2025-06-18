// src/app/models/order.ts
export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: OrderItem[];
  customer?: {
    name?: string;
    email?: string;
  };
  shippingAddress?: {
    address?: string;
    city?: string;
    zipCode?: string;
    country?: string;
  };
}