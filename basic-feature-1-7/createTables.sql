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
