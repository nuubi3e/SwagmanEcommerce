export interface IUserSession {
  name: string;
  username: string;
  picture: string;
  id: string;
  roleId: string;
}

export type SearchParams = 'page' | 'item';
