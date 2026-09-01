export type User = {
  id: string;
  name: string;
  email: string;
  roleId?: string;
  organizationId?: string;
  hotelId?: string;
  branchId?: string;
  status?: 'active' | 'inactive';
};

export const USERS_MODULE = 'users';

export const userRoutes = {
  list: '/users',
  detail: (id: string) => `/users/${id}`,
  create: '/users',
  update: (id: string) => `/users/${id}`,
  remove: (id: string) => `/users/${id}`,
};
