LOAD DATA LOCAL INFILE 'document.csv'
INTO TABLE Document
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(@executive_order_id, @pdf_url, @citation, @start_page, @end_page, @title, @signing_date, @publication_date, @president)
SET 
    executive_order_id = @executive_order_id,
    pdf_url            = @pdf_url,
    citation           = @citation,
    start_page         = @start_page,
    end_page           = @end_page,
    title              = @title,
    signing_date       = @signing_date,
    publication_date   = @publication_date,
    -- clean up unneeded chars from csv
    president          = TRIM(
                           REPLACE(
                             REPLACE(@president, CHAR(13), ''),
                           CHAR(10), '')
                         );
