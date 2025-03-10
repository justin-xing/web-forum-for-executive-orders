UPDATE VoteFor
SET is_upvote = -1
WHERE uid = 2 AND cid = 1 AND is_upvote = 1;