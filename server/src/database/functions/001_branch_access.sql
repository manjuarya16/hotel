CREATE OR REPLACE FUNCTION public.fn_user_has_branch_access(
    p_user_id BIGINT,
    p_branch_id BIGINT
)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM user_branches ub
        WHERE ub.user_id = p_user_id
          AND ub.branch_id = p_branch_id
    );
$$;

CREATE OR REPLACE FUNCTION public.fn_get_user_branch_ids(p_user_id BIGINT)
RETURNS TABLE(branch_id BIGINT)
LANGUAGE SQL
STABLE
AS $$
    SELECT ub.branch_id
    FROM user_branches ub
    WHERE ub.user_id = p_user_id;
$$;
