export interface OrderItem {
  productId: number;
  name: string;
  quantity: number;
  price: number;
  status: OrderStatus;
  imageUrl: string;
}

export interface Customer {
  name: string;
  email: string;
}

export interface ShippingAddress {
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: OrderItem[];
  customer: Customer;
  shippingAddress: ShippingAddress;
}