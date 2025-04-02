START TRANSACTION;

INSERT INTO Comment(uid, executive_order_id, message, timestamp)
VALUES (1, 14162, 'DOGE such wow', '2025-02-06 00:00:00');

INSERT INTO VoteFor(uid, cid, is_upvote)
VALUES (1, LAST_INSERT_ID(), 1);

COMMIT;