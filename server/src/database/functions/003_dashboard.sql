CREATE OR REPLACE FUNCTION public.fn_get_branch_dashboard(
    p_branch_id BIGINT,
    p_date DATE DEFAULT CURRENT_DATE
)
RETURNS TABLE (
    total_rooms BIGINT,
    occupied_rooms BIGINT,
    available_rooms BIGINT,
    maintenance_rooms BIGINT,
    today_bookings BIGINT,
    today_revenue NUMERIC
)
LANGUAGE SQL
STABLE
AS $$
    SELECT
        (SELECT COUNT(*) FROM rooms WHERE branch_id = p_branch_id),
        (SELECT COUNT(*) FROM rooms WHERE branch_id = p_branch_id AND status = 'OCCUPIED'),
        (SELECT COUNT(*) FROM rooms WHERE branch_id = p_branch_id AND status = 'AVAILABLE'),
        (SELECT COUNT(*) FROM rooms WHERE branch_id = p_branch_id AND status = 'MAINTENANCE'),
        (SELECT COUNT(*) FROM bookings WHERE branch_id = p_branch_id
            AND check_in_date = p_date AND status <> 'CANCELLED'),
        COALESCE((SELECT SUM(amount) FROM payments WHERE branch_id = p_branch_id
            AND created_at::date = p_date AND payment_status = 'PAID'), 0);
$$;
