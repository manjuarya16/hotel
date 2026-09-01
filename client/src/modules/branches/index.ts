export type Branch = {
  id: string;
  hotelId: string;
  name: string;
  location: string;
  phone?: string;
  email?: string;
  status?: 'active' | 'inactive';
};

export const BRANCHES_MODULE = 'branches';

export const branchRoutes = {
  list: '/branches',
  detail: (id: string) => `/branches/${id}`,
  create: '/branches',
  update: (id: string) => `/branches/${id}`,
  remove: (id: string) => `/branches/${id}`,
};
