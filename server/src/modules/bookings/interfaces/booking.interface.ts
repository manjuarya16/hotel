export interface BookingCreateInput {
  organization_id?: number;
  hotel_id?: number;
  branch_id?: number;
  guest_name?: string;
  check_in_date?: string;
  check_out_date?: string;
  room_type?: string;
  adults?: number;
  children?: number;
  total_amount?: number;
  advance_amount?: number;
}

export interface BookingUpdateInput {
  check_in_date?: string;
  check_out_date?: string;
  status?: string;
  payment_status?: string;
  paid_amount?: number;
}
