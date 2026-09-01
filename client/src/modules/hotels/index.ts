export type Hotel = {
  id: string;
  organizationId: string;
  name: string;
  status: 'active' | 'inactive' | 'pending';
  city?: string;
  country?: string;
  createdAt?: string;
};

export const HOTELS_MODULE = 'hotels';

export const hotelRoutes = {
  list: '/hotels',
  detail: (id: string) => `/hotels/${id}`,
  create: '/hotels',
  update: (id: string) => `/hotels/${id}`,
  remove: (id: string) => `/hotels/${id}`,
};
