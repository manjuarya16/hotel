export type DashboardSummary = {
  bookings?: number;
  rooms?: number;
  guests?: number;
  revenue?: number;
};

export type OccupancyTrend = {
  status: string;
  total: number;
};

export type RevenueTrend = {
  day: string;
  revenue: number;
};

export const REPORTS_MODULE = 'reports';

export const reportRoutes = {
  dashboard: '/reports/dashboard',
  occupancy: '/reports/occupancy',
  revenue: '/reports/revenue',
};
