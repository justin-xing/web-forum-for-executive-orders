WITH VoteCounts AS (
    SELECT cid, SUM(CASE WHEN is_upvote = TRUE THEN 1 ELSE 0 END) AS upvotes, SUM(CASE WHEN is_upvote = FALSE THEN 1 ELSE 0 END) AS downvotes
    FROM VoteFor
    GROUP BY cid
), CommentControversy AS (
    SELECT c.cid, c.message, c.timestamp, u.name AS user_name, u.username, d.title AS document_title, d.executive_order_id, vc.upvotes, vc.downvotes, ABS(vc.upvotes - vc.downvotes) AS controversy_score, (vc.upvotes + vc.downvotes) AS total_votes
    FROM Comment c
    JOIN User u ON c.uid = u.uid
    JOIN Document d ON c.executive_order_id = d.executive_order_id
    LEFT JOIN VoteCounts vc ON c.cid = vc.cid
    WHERE (vc.upvotes + vc.downvotes) > 0
)
SELECT cid, message, timestamp, user_name, username, document_title, executive_order_id, upvotes, downvotes, controversy_score, total_votes
FROM CommentControversy
ORDER BY controversy_score ASC, total_votes DESC
LIMIT 10; 