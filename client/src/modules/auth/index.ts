export type UserSession = {
  userId: string;
  email: string;
  role: string;
  organizationId?: string;
  hotelId?: string;
  branchId?: string;
};

export const AUTH_MODULE = 'auth';

export const authRoutes = {
  login: '/auth/login',
  me: '/auth/me',
  logout: '/auth/logout',
};
