SELECT *
FROM Document
WHERE president = 'Donald Trump'
  AND signing_date BETWEEN '2017-01-01' AND '2019-12-31'
  AND tag = 'Immigration';

