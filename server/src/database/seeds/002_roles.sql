INSERT INTO roles (organization_id, name, code, description, is_system_role)
SELECT NULL, x.name, x.code, x.description, TRUE
FROM (VALUES
    ('Super Admin','SUPER_ADMIN','Full platform access'),
    ('Organization Admin','ORGANIZATION_ADMIN','Organization-wide administration'),
    ('Hotel Admin','HOTEL_ADMIN','Hotel administration'),
    ('Hotel Manager','HOTEL_MANAGER','Hotel/branch operations'),
    ('Branch Manager','BRANCH_MANAGER','Branch operations'),
    ('Receptionist','RECEPTIONIST','Front desk operations'),
    ('Housekeeping','HOUSEKEEPING','Housekeeping operations'),
    ('Accountant','ACCOUNTANT','Finance operations'),
    ('Maintenance','MAINTENANCE','Maintenance operations')
) AS x(name, code, description)
WHERE NOT EXISTS (
    SELECT 1 FROM roles r WHERE r.organization_id IS NULL AND r.code = x.code
);
