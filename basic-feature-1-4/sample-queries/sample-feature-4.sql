SELECT 
  c.cid,
  c.uid,
  c.message,
  (
    SELECT COUNT(uid) 
    FROM VoteFor v
    WHERE v.cid = c.cid 
      AND v.is_upvote = 1
  )
  -
  (
    SELECT COUNT(uid) 
    FROM VoteFor v
    WHERE v.cid = c.cid 
      AND v.is_upvote = 0
  ) AS vote_score
FROM Document d
JOIN Comment c 
  ON d.executive_order_id = c.executive_order_id
WHERE d.executive_order_id = 14195 -- test id
ORDER BY vote_score DESC;