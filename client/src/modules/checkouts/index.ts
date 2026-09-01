export type Checkout = {
  id: string;
  bookingId?: string;
  guestId?: string;
  roomId?: string;
  checkoutTime?: string;
  status?: 'PENDING' | 'COMPLETED';
};

export const CHECKOUTS_MODULE = 'checkouts';

export const checkoutRoutes = {
  list: '/checkouts',
  detail: (id: string) => `/checkouts/${id}`,
  create: '/checkouts',
  update: (id: string) => `/checkouts/${id}`,
  remove: (id: string) => `/checkouts/${id}`,
};
