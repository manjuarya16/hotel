export type Booking = {
  id: string;
  guestId?: string;
  hotelId?: string;
  branchId?: string;
  roomId?: string;
  checkInDate?: string;
  checkOutDate?: string;
  status?: 'pending' | 'confirmed' | 'checked_in' | 'completed' | 'cancelled';
  totalAmount?: number;
};

export const BOOKINGS_MODULE = 'bookings';

export const bookingRoutes = {
  list: '/bookings',
  detail: (id: string) => `/bookings/${id}`,
  create: '/bookings',
  update: (id: string) => `/bookings/${id}`,
  remove: (id: string) => `/bookings/${id}`,
};
