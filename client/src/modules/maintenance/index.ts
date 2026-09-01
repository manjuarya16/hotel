export type Maintenance = {
  id: string;
  roomId?: string;
  requestType?: string;
  description?: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  status?: 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
};

export const MAINTENANCE_MODULE = 'maintenance';

export const maintenanceRoutes = {
  list: '/maintenance',
  detail: (id: string) => `/maintenance/${id}`,
  create: '/maintenance',
  update: (id: string) => `/maintenance/${id}`,
  remove: (id: string) => `/maintenance/${id}`,
};
