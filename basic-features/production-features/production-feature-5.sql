UPDATE VoteFor
SET is_upvote = 0
WHERE uid = 1 AND cid = 167 AND is_upvote = 1;

SELECT
  c.cid,
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
FROM Comment c
WHERE c.cid = 167;
