CREATE TABLE IF NOT EXISTS branches (
    id BIGSERIAL PRIMARY KEY,
    organization_id BIGINT NOT NULL REFERENCES organizations(id),
    hotel_id BIGINT NOT NULL REFERENCES hotels(id),
    branch_code VARCHAR(50) NOT NULL,
    branch_name VARCHAR(150) NOT NULL,
    address_id BIGINT REFERENCES addresses(id),
    phone VARCHAR(30),
    email CITEXT,
    manager_id BIGINT,
    check_in_time TIME NOT NULL DEFAULT '12:00',
    check_out_time TIME NOT NULL DEFAULT '11:00',
    timezone VARCHAR(60) NOT NULL DEFAULT 'Asia/Kolkata',
    currency CHAR(3) NOT NULL DEFAULT 'INR',
    status VARCHAR(25) NOT NULL DEFAULT 'ACTIVE'
        CHECK (status IN ('ACTIVE','INACTIVE','TEMPORARILY_CLOSED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (hotel_id, branch_code),
    UNIQUE (hotel_id, branch_name)
);
