-- SELECT QUERIES
SELECT * FROM users;
SELECT * FROM agreements;
SELECT * FROM agreements_status;
SELECT * FROM notifications;
SELECT * FROM agent_invite_codes;
SELECT * FROM agent_to_agent_reviews;
SELECT * FROM notifications;

-- DROP TABLES
DROP TABLE agreements CASCADE;
DROP TABLE notifications;
DROP TABLE agreements_status;
DROP TABLE users CASCADE;
DROP TABLE agent_invite_codes CASCADE;
DROP TABLE agent_to_agent_reviews;
DROP TABLE notifications CASCADE;