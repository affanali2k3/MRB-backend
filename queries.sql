-- SELECT QUERIES
SELECT * FROM users;
SELECT * FROM agreements;
SELECT * FROM agreements_status;
SELECT * FROM notifications;


-- DROP TABLES
DROP TABLE agreements CASCADE;
DROP TABLE notifications;
DROP TABLE agreements_status;
DROP TABLE users CASCADE;