DROP TABLE IF EXISTS VoteFor;
DROP TABLE IF EXISTS Comment;
DROP TABLE IF EXISTS Document;
DROP TABLE IF EXISTS User;

CREATE TABLE User(
    uid                    INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name                   VARCHAR(50),
    username               VARCHAR(50),
    location               VARCHAR(50),
    role                   VARCHAR(50),
    password_hash          VARCHAR(100),
    email                  VARCHAR(75),
    gender                 VARCHAR(10),
    account_creation_date  DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_of_birth          DATE,
    profile_picture_url    VARCHAR(2083),
    bio                    VARCHAR(1000)
);

CREATE TABLE Document(
    executive_order_id     INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id                INT NOT NULL,
    pdf_url                VARCHAR(2083),
    citation               VARCHAR(15),
    start_page             INT,
    end_page               INT,
    title                  VARCHAR(100),
    signing_date           DATE,
    publication_date       DATE,
    tag                    VARCHAR(50),
    president              VARCHAR(50),
    FOREIGN KEY(user_id) REFERENCES User(uid) ON DELETE CASCADE
);



CREATE TABLE Comment(
    cid                    INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    uid                    INT NOT NULL,
    executive_order_id     INT NOT NULL,
    message                VARCHAR(5000),
    timestamp              TIMESTAMP,
    FOREIGN KEY(uid) REFERENCES User(uid) ON DELETE CASCADE,
    FOREIGN KEY(executive_order_id) REFERENCES Document(executive_order_id) ON DELETE CASCADE
);

CREATE TABLE VoteFor(
    uid                    INT NOT NULL,
    cid                    INT NOT NULL,
    is_upvote              BOOLEAN,
    PRIMARY KEY(uid,cid),
    FOREIGN KEY(uid) REFERENCES User(uid) ON DELETE CASCADE,
    FOREIGN KEY(cid) REFERENCES Comment(cid) ON DELETE CASCADE
);
