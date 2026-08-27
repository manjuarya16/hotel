INSERT INTO roles (organization_id, name, code, description, is_system_role)
VALUES
(NULL, 'Super Admin', 'SUPER_ADMIN', 'Platform administrator', TRUE),
(NULL, 'Organization Admin', 'ORGANIZATION_ADMIN', 'Organization administrator', TRUE),
(NULL, 'Hotel Admin', 'HOTEL_ADMIN', 'Hotel administrator', TRUE),
(NULL, 'Hotel Manager', 'HOTEL_MANAGER', 'Hotel manager', TRUE),
(NULL, 'Branch Manager', 'BRANCH_MANAGER', 'Branch manager', TRUE),
(NULL, 'Receptionist', 'RECEPTIONIST', 'Front desk staff', TRUE),
(NULL, 'Housekeeping', 'HOUSEKEEPING', 'Housekeeping staff', TRUE),
(NULL, 'Accountant', 'ACCOUNTANT', 'Finance staff', TRUE),
(NULL, 'Maintenance', 'MAINTENANCE', 'Maintenance staff', TRUE)
ON CONFLICT DO NOTHING;
