DROP TABLE IF EXISTS VoteFor;
DROP TABLE IF EXISTS Comment;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Document;

CREATE TABLE Document(
    executive_order_id     INT NOT NULL PRIMARY KEY,
    pdf_url                VARCHAR(2083),
    citation               VARCHAR(15),
    start_page             INT,
    end_page               INT,
    title                  VARCHAR(100),
    signing_date           DATE,
    publication_date       DATE,
    president              VARCHAR(50)
);

CREATE TABLE User(
    uid                    INT NOT NULL PRIMARY KEY,
    name                   VARCHAR(50),
    username               VARCHAR(50),
    location               VARCHAR(50),
    role                   VARCHAR(50),
    password_hash          VARCHAR(100),
    email                  VARCHAR(75),
    gender                 VARCHAR(10),
    account_creation_date  DATETIME,
    date_of_birth          DATE,
    profile_picture_url    VARCHAR(2083),
    bio                    VARCHAR(1000)
);

CREATE TABLE Comment(
    cid                    INT NOT NULL PRIMARY KEY,
    uid                    INT NOT NULL,
    executive_order_id     INT NOT NULL,
    message                VARCHAR(5000),
    timestamp              TIMESTAMP,
    FOREIGN KEY(uid) REFERENCES User(uid),
    FOREIGN KEY(executive_order_id) REFERENCES Document(executive_order_id)
);

CREATE TABLE VoteFor(
    uid                    INT NOT NULL,
    cid                    INT NOT NULL,
    is_upvote              BOOLEAN,
    PRIMARY KEY(uid,cid),
    FOREIGN KEY(uid) REFERENCES User(uid),
    FOREIGN KEY(cid) REFERENCES Comment(cid)
);
