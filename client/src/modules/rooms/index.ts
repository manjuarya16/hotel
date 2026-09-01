export type Room = {
  id: string;
  hotelId: string;
  branchId?: string;
  roomNumber: string;
  roomTypeId?: string;
  status: 'available' | 'occupied' | 'maintenance' | 'dirty';
  pricePerNight?: number;
};

export const ROOMS_MODULE = 'rooms';

export const roomRoutes = {
  list: '/rooms',
  detail: (id: string) => `/rooms/${id}`,
  create: '/rooms',
  update: (id: string) => `/rooms/${id}`,
  remove: (id: string) => `/rooms/${id}`,
};
