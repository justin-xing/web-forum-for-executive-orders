BEGIN TRANSACTION;

INSERT INTO Comment(uid,executive_order_id,message,timestamp) VALUES(?,?,'?','?');

INSERT INTO VoteFor(uid, cid, is_upvote)
VALUES(?, LAST_INSERT_ID(), 1);

COMMIT;
