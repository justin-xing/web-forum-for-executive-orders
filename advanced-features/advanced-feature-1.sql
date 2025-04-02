SELECT executive_order_id, title, president, signing_date, tag
FROM Document
WHERE MATCH(title) AGAINST('rights' IN NATURAL LANGUAGE MODE)
LIMIT 50;
