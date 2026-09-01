export type Checkin = {
  id: string;
  bookingId?: string;
  guestId?: string;
  roomId?: string;
  checkinTime?: string;
  status?: 'CHECKED_IN' | 'PENDING';
};

export const CHECKINS_MODULE = 'checkins';

export const checkinRoutes = {
  list: '/checkins',
  detail: (id: string) => `/checkins/${id}`,
  create: '/checkins',
  update: (id: string) => `/checkins/${id}`,
  remove: (id: string) => `/checkins/${id}`,
};
