CREATE OR REPLACE FUNCTION public.fn_get_user_branches(p_user_id BIGINT)
RETURNS TABLE(branch_id BIGINT, hotel_id BIGINT, organization_id BIGINT)
LANGUAGE sql STABLE AS $$
    SELECT b.id, b.hotel_id, b.organization_id
    FROM user_branches ub
    JOIN branches b ON b.id = ub.branch_id
    JOIN users u ON u.id = ub.user_id
    WHERE ub.user_id = p_user_id
      AND b.status = 'ACTIVE'
      AND u.status = 'ACTIVE';
$$;

CREATE OR REPLACE FUNCTION public.fn_user_has_branch_access(
    p_user_id BIGINT,
    p_branch_id BIGINT
)
RETURNS BOOLEAN
LANGUAGE sql STABLE AS $$
    SELECT EXISTS (
        SELECT 1
        FROM user_branches ub
        JOIN branches b ON b.id = ub.branch_id
        WHERE ub.user_id = p_user_id
          AND ub.branch_id = p_branch_id
          AND b.status = 'ACTIVE'
    );
$$;

