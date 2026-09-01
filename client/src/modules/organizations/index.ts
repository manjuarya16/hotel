export type Organization = {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  country?: string;
  createdAt?: string;
};

export const ORGANIZATIONS_MODULE = 'organizations';

export const organizationRoutes = {
  list: '/organizations',
  detail: (id: string) => `/organizations/${id}`,
  create: '/organizations',
  update: (id: string) => `/organizations/${id}`,
  remove: (id: string) => `/organizations/${id}`,
};
