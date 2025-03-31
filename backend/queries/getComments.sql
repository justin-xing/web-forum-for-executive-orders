SELECT u.username, u.uid, c.cid, c.timestamp, c.message, (
SELECT count(uid)
FROM VoteFor
WHERE is_upvote=1 AND cid=c.cid
) - (
SELECT count(uid)
FROM VoteFor
WHERE is_upvote=0 AND cid=c.cid
) AS vote_score, (
	SELECT count(uid)
FROM VoteFor
WHERE is_upvote=1 AND cid=c.cid
) AS upvotes, (
	SELECT count(uid)
FROM VoteFor
WHERE is_upvote=0 AND cid=c.cid
) AS downvotes
FROM Document d
LEFT JOIN Comment c
	ON c.executive_order_id = d.executive_order_id
JOIN User u
ON c.uid = u.uid
WHERE d.executive_order_id = ?
ORDER BY timestamp DESC;
