LOAD DATA LOCAL INFILE 'generation/output_user.csv'
INTO TABLE User
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(uid,name,username,location,role,password_hash,email,gender,account_creation_date,date_of_birth,profile_picture_url,bio);

LOAD DATA LOCAL INFILE 'generation/output_document.csv'
INTO TABLE Document
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(@executive_order_id, @pdf_url, @citation, @start_page, @end_page, @title, @signing_date, @publication_date, @president, @tag)
SET 
    executive_order_id = @executive_order_id,
    pdf_url            = @pdf_url,
    citation           = @citation,
    start_page         = @start_page,
    end_page           = @end_page,
    title              = @title,
    signing_date       = @signing_date,
    publication_date   = @publication_date,
    president          = @president,
    tag                = TRIM(
                           REPLACE(
                             REPLACE(@tag, CHAR(13), ''),
                           CHAR(10), '')
                         ),
    user_id            = 1;
    
LOAD DATA LOCAL INFILE 'generation/output_comments.csv'
INTO TABLE Comment
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(cid,uid,executive_order_id,message,timestamp);

LOAD DATA LOCAL INFILE 'generation/output_votes.csv'
INTO TABLE VoteFor
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(uid,cid,is_upvote);

ALTER TABLE VoteFor
  ADD INDEX idx_vote_cid_isup (cid, is_upvote);

ALTER TABLE VoteFor
  ADD INDEX idx_vote_uid_cid_up (uid, cid, is_upvote);

ALTER TABLE Document
  ADD INDEX idx_document_president_tag_date (president, tag, signing_date),
  ADD FULLTEXT(title);

ALTER TABLE Comment
  ADD INDEX idx_comment_uid (uid),
  ADD INDEX idx_comment_executive_order_id (executive_order_id);
