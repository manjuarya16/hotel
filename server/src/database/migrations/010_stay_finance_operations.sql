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
    invoice_number VARCHAR(60) NOT NULL,
    subtotal NUMERIC(12,2) NOT NULL DEFAULT 0,
    discount NUMERIC(12,2) NOT NULL DEFAULT 0,
    tax NUMERIC(12,2) NOT NULL DEFAULT 0,
    total NUMERIC(12,2) NOT NULL DEFAULT 0,
    status VARCHAR(30) NOT NULL DEFAULT 'UNPAID',
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
    amount NUMERIC(12,2) NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS payments (
    id BIGSERIAL PRIMARY KEY,
    organization_id BIGINT NOT NULL REFERENCES organizations(id),
    branch_id BIGINT NOT NULL REFERENCES branches(id),
    booking_id BIGINT REFERENCES bookings(id),
    invoice_id BIGINT REFERENCES invoices(id),
    amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
    payment_method VARCHAR(30) NOT NULL,
    payment_status VARCHAR(30) NOT NULL DEFAULT 'PAID',
    reference_number VARCHAR(100),
    received_by BIGINT REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS expenses (
    id BIGSERIAL PRIMARY KEY,
    organization_id BIGINT NOT NULL REFERENCES organizations(id),
    branch_id BIGINT NOT NULL REFERENCES branches(id),
    category VARCHAR(100) NOT NULL,
    description TEXT,
    amount NUMERIC(12,2) NOT NULL CHECK (amount >= 0),
    expense_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_by BIGINT REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS housekeeping_tasks (
    id BIGSERIAL PRIMARY KEY,
    branch_id BIGINT NOT NULL REFERENCES branches(id),
    room_id BIGINT NOT NULL REFERENCES rooms(id),
    assigned_to BIGINT REFERENCES users(id),
    task_type VARCHAR(50) NOT NULL DEFAULT 'CLEANING',
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS maintenance_tickets (
    id BIGSERIAL PRIMARY KEY,
    branch_id BIGINT NOT NULL REFERENCES branches(id),
    room_id BIGINT REFERENCES rooms(id),
    issue VARCHAR(200) NOT NULL,
    description TEXT,
    priority VARCHAR(20) NOT NULL DEFAULT 'MEDIUM',
    assigned_to BIGINT REFERENCES users(id),
    status VARCHAR(30) NOT NULL DEFAULT 'OPEN',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);
