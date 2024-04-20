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
