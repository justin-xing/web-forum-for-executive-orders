SELECT c.comment_id, c.message, (
SELECT count(uid)
FROM VotesFor
WHERE is_upvote=1 AND comment_id=c.comment_id
) - (
SELECT count(uid)
FROM VotesFor
WHERE is_upvote=0 AND comment_id=c.comment_id
) AS vote_score
FROM Documents d
LEFT JOIN IsCommentFor c
	ON c.executive_order_id = d.executive_order_id
WHERE d.executive_order_id = ?
ORDER BY vote_score DESC;
