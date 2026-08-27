CREATE TABLE IF NOT EXISTS checkins (
    id BIGSERIAL PRIMARY KEY,
    booking_id BIGINT NOT NULL UNIQUE REFERENCES bookings(id),
    branch_id BIGINT NOT NULL REFERENCES branches(id),
    checked_in_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    checked_in_by BIGINT REFERENCES users(id),
    notes TEXT
);

CREATE TABLE IF NOT EXISTS checkouts (
    id BIGSERIAL PRIMARY KEY,
    booking_id BIGINT NOT NULL UNIQUE REFERENCES bookings(id),
    branch_id BIGINT NOT NULL REFERENCES branches(id),
    checked_out_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    checked_out_by BIGINT REFERENCES users(id),
    notes TEXT
);

CREATE TABLE IF NOT EXISTS invoices (
    id BIGSERIAL PRIMARY KEY,
    organization_id BIGINT NOT NULL REFERENCES organizations(id),
    branch_id BIGINT NOT NULL REFERENCES branches(id),
    booking_id BIGINT NOT NULL REFERENCES bookings(id),
    invoice_number VARCHAR(50) NOT NULL,
    subtotal NUMERIC(12,2) NOT NULL DEFAULT 0,
    discount NUMERIC(12,2) NOT NULL DEFAULT 0,
    tax NUMERIC(12,2) NOT NULL DEFAULT 0,
    total NUMERIC(12,2) NOT NULL DEFAULT 0,
    paid_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
    balance_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'OPEN',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (branch_id, invoice_number)
);

CREATE TABLE IF NOT EXISTS invoice_items (
    id BIGSERIAL PRIMARY KEY,
    invoice_id BIGINT NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    description VARCHAR(255) NOT NULL,
    quantity NUMERIC(10,2) NOT NULL DEFAULT 1,
    unit_price NUMERIC(12,2) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
    total_amount NUMERIC(12,2) NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS payments (
    id BIGSERIAL PRIMARY KEY,
    organization_id BIGINT NOT NULL REFERENCES organizations(id),
    branch_id BIGINT NOT NULL REFERENCES branches(id),
    booking_id BIGINT REFERENCES bookings(id),
    invoice_id BIGINT REFERENCES invoices(id),
    amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
    payment_method VARCHAR(30) NOT NULL,
    payment_status VARCHAR(20) NOT NULL DEFAULT 'PAID',
    reference_number VARCHAR(100),
    notes TEXT,
    created_by BIGINT REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CHECK (payment_method IN ('CASH','CARD','UPI','BANK_TRANSFER','OTHER')),
    CHECK (payment_status IN ('PENDING','PAID','REFUNDED'))
);
