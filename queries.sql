-- SELECT QUERIES
SELECT * FROM users;
SELECT * FROM user_associates;
SELECT * FROM agreements;
SELECT * FROM agreements_status;
SELECT * FROM notifications;
SELECT * FROM agent_invite_codes;
SELECT * FROM agent_to_agent_reviews;
SELECT * FROM notifications;
SELECT * FROM sender_agent_open_forms;
SELECT * FROM receiver_agent_open_forms;
SELECT * FROM sender_agent_direct_forms;
SELECT * FROM agent_analytics;
SELECT * FROM posts;
SELECT * FROM post_images;
SELECT * FROM comments;

-- DROP TABLES
DROP TABLE agreements CASCADE;
DROP TABLE notifications;
DROP TABLE agreements_status;
DROP TABLE users CASCADE;
DROP TABLE user_associates CASCADE;
DROP TABLE agent_invite_codes CASCADE;
DROP TABLE agent_to_agent_reviews;
DROP TABLE notifications CASCADE;
DROP TABLE sender_agent_open_forms CASCADE;
DROP TABLE receiver_agent_open_forms CASCADE;
DROP TABLE receiver_agent_direct_forms CASCADE;
DROP TABLE sender_agent_direct_forms CASCADE;
DROP TABLE agent_analytics CASCADE;
DROP TABLE comments CASCADE;
DROP TABLE posts CASCADE;

-- ALTER TABLES
ALTER TABLE user_associates DROP CONSTRAINT user_associates_associate_id_fkey CASCADE;