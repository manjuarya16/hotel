CREATE TABLE IF NOT EXISTS bookings (
    id BIGSERIAL PRIMARY KEY,
    organization_id BIGINT NOT NULL REFERENCES organizations(id),
    hotel_id BIGINT NOT NULL REFERENCES hotels(id),
    branch_id BIGINT NOT NULL REFERENCES branches(id),
    booking_number VARCHAR(50) NOT NULL,
    guest_id BIGINT NOT NULL REFERENCES guests(id),
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    adults INTEGER NOT NULL DEFAULT 1 CHECK (adults >= 1),
    children INTEGER NOT NULL DEFAULT 0 CHECK (children >= 0),
    booking_source VARCHAR(30) NOT NULL DEFAULT 'WALK_IN',
    status VARCHAR(25) NOT NULL DEFAULT 'RESERVED',
    subtotal NUMERIC(12,2) NOT NULL DEFAULT 0,
    discount NUMERIC(12,2) NOT NULL DEFAULT 0,
    tax NUMERIC(12,2) NOT NULL DEFAULT 0,
    total_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
    advance_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
    paid_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
    balance_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
    payment_status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    notes TEXT,
    created_by BIGINT REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CHECK (check_out_date > check_in_date),
    UNIQUE (branch_id, booking_number),
    CHECK (status IN ('INQUIRY','RESERVED','CONFIRMED','CHECKED_IN','CHECKED_OUT','CANCELLED','NO_SHOW')),
    CHECK (payment_status IN ('PENDING','PARTIAL','PAID','REFUNDED'))
);

CREATE TABLE IF NOT EXISTS booking_rooms (
    id BIGSERIAL PRIMARY KEY,
    booking_id BIGINT NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    room_id BIGINT NOT NULL REFERENCES rooms(id),
    rate NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (rate >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (booking_id, room_id)
);
