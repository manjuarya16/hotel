CREATE OR REPLACE FUNCTION public.fn_get_available_rooms(
    p_branch_id BIGINT,
    p_check_in DATE,
    p_check_out DATE,
    p_room_type_id BIGINT DEFAULT NULL
)
RETURNS TABLE (
    room_id BIGINT,
    room_number VARCHAR,
    room_type_id BIGINT,
    room_type_name VARCHAR,
    base_price NUMERIC
)
LANGUAGE SQL
STABLE
AS $$
    SELECT r.id, r.room_number, r.room_type_id, rt.name, r.base_price
    FROM rooms r
    JOIN room_types rt ON rt.id = r.room_type_id
    WHERE r.branch_id = p_branch_id
      AND r.status NOT IN ('MAINTENANCE', 'OUT_OF_SERVICE')
      AND (p_room_type_id IS NULL OR r.room_type_id = p_room_type_id)
      AND NOT EXISTS (
          SELECT 1
          FROM booking_rooms br
          JOIN bookings b ON b.id = br.booking_id
          WHERE br.room_id = r.id
            AND b.status IN ('RESERVED','CONFIRMED','CHECKED_IN')
            AND b.check_in_date < p_check_out
            AND b.check_out_date > p_check_in
      );
$$;
