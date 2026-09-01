export type Guest = {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  country?: string;
  status?: 'active' | 'inactive';
};

export const GUESTS_MODULE = 'guests';

export const guestRoutes = {
  list: '/guests',
  detail: (id: string) => `/guests/${id}`,
  create: '/guests',
  update: (id: string) => `/guests/${id}`,
  remove: (id: string) => `/guests/${id}`,
};
