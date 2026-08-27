CREATE TABLE IF NOT EXISTS user_hotels (
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    hotel_id BIGINT NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, hotel_id)
);

CREATE TABLE IF NOT EXISTS user_branches (
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    branch_id BIGINT NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, branch_id)
);
