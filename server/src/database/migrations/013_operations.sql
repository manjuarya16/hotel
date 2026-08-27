CREATE TABLE IF NOT EXISTS housekeeping_tasks (
    id BIGSERIAL PRIMARY KEY,
    organization_id BIGINT NOT NULL REFERENCES organizations(id),
    branch_id BIGINT NOT NULL REFERENCES branches(id),
    room_id BIGINT NOT NULL REFERENCES rooms(id),
    assigned_to BIGINT REFERENCES users(id),
    task_type VARCHAR(30) NOT NULL DEFAULT 'CLEANING',
    priority VARCHAR(20) NOT NULL DEFAULT 'NORMAL',
    status VARCHAR(25) NOT NULL DEFAULT 'PENDING',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS maintenance_tickets (
    id BIGSERIAL PRIMARY KEY,
    organization_id BIGINT NOT NULL REFERENCES organizations(id),
    branch_id BIGINT NOT NULL REFERENCES branches(id),
    room_id BIGINT REFERENCES rooms(id),
    issue VARCHAR(200) NOT NULL,
    description TEXT,
    priority VARCHAR(20) NOT NULL DEFAULT 'MEDIUM',
    assigned_to BIGINT REFERENCES users(id),
    status VARCHAR(25) NOT NULL DEFAULT 'OPEN',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS expense_categories (
    id BIGSERIAL PRIMARY KEY,
    organization_id BIGINT NOT NULL REFERENCES organizations(id),
    name VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    UNIQUE (organization_id, name)
);

CREATE TABLE IF NOT EXISTS expenses (
    id BIGSERIAL PRIMARY KEY,
    organization_id BIGINT NOT NULL REFERENCES organizations(id),
    branch_id BIGINT NOT NULL REFERENCES branches(id),
    category_id BIGINT NOT NULL REFERENCES expense_categories(id),
    amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
    expense_date DATE NOT NULL DEFAULT CURRENT_DATE,
    description TEXT,
    created_by BIGINT REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
