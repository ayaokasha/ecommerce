import { ProductI } from "./product";

export interface CartResponse {
  status: string;
  message?: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: Item[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
}

export interface Item {
  count: number;
  _id: string;
  product: ProductI;
  price: number;
}

export interface Order {
  _id: string;
  cartItems: Item[];
  totalOrderPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
}
