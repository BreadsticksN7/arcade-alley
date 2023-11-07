-- Test users have password "password"
-- Setup password is "password"

INSERT INTO users (username, password, first_name, last_name, email, is_admin)
VALUES ('setup',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Admin',
        'Setup',
        'delete@aftersetup.com',
        TRUE);
