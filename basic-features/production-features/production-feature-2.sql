SELECT u.username, c.cid, c.timestamp, c.message, (
SELECT count(uid)
FROM VoteFor
WHERE is_upvote=1 AND cid=c.cid
) - (
SELECT count(uid)
FROM VoteFor
WHERE is_upvote=0 AND cid=c.cid
) AS vote_score
FROM Document d
LEFT JOIN Comment c
   ON c.executive_order_id = d.executive_order_id
JOIN User u
ON c.uid = u.uid
WHERE d.executive_order_id = 14159
ORDER BY vote_score DESC;