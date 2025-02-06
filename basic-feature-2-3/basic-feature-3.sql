SELECT d.executive_order_id,c.message,c.upvotes,c.downvotes,(
    SELECT COUNT(uid)
    FROM Vote v
    WHERE is_upvote = 1 AND v.cid = c.cid
) - (
    SELECT COUNT(uid)
    FROM Vote v
    WHERE is_upvote = 0 AND v.cid = c.cid
) AS vote_score
FROM User u
JOIN Comment c ON u.uid = c.uid
JOIN Document d ON c.executive_order_id = d.executive_order_id
WHERE u.uid = 1
ORDER BY c.timestamp DESC;