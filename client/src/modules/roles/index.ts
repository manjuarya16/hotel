export type Role = {
  id: string;
  name: string;
  description?: string;
  isSystem?: boolean;
};

export const ROLES_MODULE = 'roles';

export const roleRoutes = {
  list: '/roles',
  detail: (id: string) => `/roles/${id}`,
  create: '/roles',
  update: (id: string) => `/roles/${id}`,
  remove: (id: string) => `/roles/${id}`,
};
