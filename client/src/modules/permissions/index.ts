export type Permission = {
  id: string;
  key: string;
  label: string;
  module: string;
};

export const PERMISSIONS_MODULE = 'permissions';

export const permissionRoutes = {
  list: '/permissions',
  detail: (id: string) => `/permissions/${id}`,
  create: '/permissions',
  update: (id: string) => `/permissions/${id}`,
  remove: (id: string) => `/permissions/${id}`,
};
