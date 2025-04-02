SELECT d.president, COUNT(v.cid) AS relevance_score
FROM Document d
STRAIGHT_JOIN Comment c FORCE INDEX (idx_comment_executive_order_id) ON d.executive_order_id = c.executive_order_id
STRAIGHT_JOIN VoteFor v FORCE INDEX (idx_vote_cid_isup) ON c.cid = v.cid
GROUP BY d.president
ORDER BY relevance_score DESC;