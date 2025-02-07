LOAD DATA LOCAL INFILE 'basic-feature-2-3/sampledata.csv'
INTO TABLE Document
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(executive_order_id,url,start_page,end_page,title,signing_date,publication_date,president);

LOAD DATA LOCAL INFILE 'basic-feature-2-3/user.csv'
INTO TABLE User
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(uid,name,username,location,role,password_hash,email,gender,account_creation_date,date_of_birth,profile_picture_url,bio);

LOAD DATA LOCAL INFILE 'basic-feature-2-3/comment.csv'
INTO TABLE Comment
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(cid,uid,executive_order_id,message,upvotes,downvotes,timestamp);

LOAD DATA LOCAL INFILE 'basic-feature-2-3/vote.csv'
INTO TABLE Vote
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(uid,cid,is_upvote);
