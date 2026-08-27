CREATE TABLE IF NOT EXISTS room_types (
    id BIGSERIAL PRIMARY KEY,
    branch_id BIGINT NOT NULL REFERENCES branches(id),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    capacity INTEGER NOT NULL DEFAULT 1 CHECK (capacity > 0),
    base_price NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (base_price >= 0),
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE'
        CHECK (status IN ('ACTIVE','INACTIVE')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (branch_id, name)
);

CREATE TABLE IF NOT EXISTS rooms (
    id BIGSERIAL PRIMARY KEY,
    branch_id BIGINT NOT NULL REFERENCES branches(id),
    room_type_id BIGINT NOT NULL REFERENCES room_types(id),
    room_number VARCHAR(30) NOT NULL,
    floor VARCHAR(30),
    capacity INTEGER NOT NULL DEFAULT 1 CHECK (capacity > 0),
    base_price NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (base_price >= 0),
    status VARCHAR(25) NOT NULL DEFAULT 'AVAILABLE'
        CHECK (status IN ('AVAILABLE','RESERVED','OCCUPIED','CLEANING','MAINTENANCE','OUT_OF_SERVICE')),
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (branch_id, room_number)
);
