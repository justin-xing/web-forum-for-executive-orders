SELECT *
FROM Document
WHERE president = 'Donald Trump'
  AND signing_date BETWEEN '2021-01-01' AND '2021-12-31'
  AND tag = 'Immigration';

