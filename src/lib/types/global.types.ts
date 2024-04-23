export interface IUserSession {
  name: string;
  username: string;
  picture: string;
  id: string;
  roleId: string;
}

export type SearchParams = 'page' | 'item';

export interface ReviewPayload {
  userId: string;
  productId: string;
  review: string;
  rating: number;
  username: string;
}

export interface UserSession {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  mobileNo: number;
  email: string;
}

export interface ProductOrderInfo {
  id: string;
  size: string;
  quantity: number;
  price: number;
  image?: string;
  name: string;
}

export interface ProductPayload {
  id: string;
  size: string;
  quantity: number;
}

export interface CartItems {
  id: string;
  size: string;
  price: number;
  quantity: number;
  name: string;
}
