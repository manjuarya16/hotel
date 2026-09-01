export type RoomType = {
  id: string;
  name: string;
  capacity: number;
  pricePerNight: number;
  description?: string;
};

export const ROOM_TYPES_MODULE = 'room-types';

export const roomTypeRoutes = {
  list: '/room-types',
  detail: (id: string) => `/room-types/${id}`,
  create: '/room-types',
  update: (id: string) => `/room-types/${id}`,
  remove: (id: string) => `/room-types/${id}`,
};
