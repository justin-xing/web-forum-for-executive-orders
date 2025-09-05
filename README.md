# Forum for American Executive Orders


## How to create and load the sample database

Install MySQL, and create a test database and a test table.
To run the sample data, `cd` into the `/sampledata` directory.

```
mysql -u root -p (or sudo mysql -u root)
mysql> CREATE DATABASE testDB;
mysql> USE testDB;
mysql> SET GLOBAL local_infile=ON;
mysql> quit;
mysql --local-infile=1 -u root -p -D testDB
mysql> source "**FULL PATH TO createTables.sql**"
mysql> source "**FULL PATH TO populateTables.sql**"
mysql> source "**FULL PATH TO outputTables.sql**"
```

Create an admin user you will use to connect to the database in the application:

First, check your MySQL Authentication Plugin:

```
SELECT user, host, plugin FROM mysql.user WHERE user = 'apiusr';
```

If your MySQL server is running `mysql_native_password`, run the following:

```
mysql> CREATE USER 'apiusr'@'localhost' IDENTIFIED BY 'password';
mysql> GRANT ALL ON *.* to 'apiusr'@'localhost';
mysql> ALTER USER 'apiusr'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```

If your MySQL server is running `caching_sha2_password`, run the following:

```
mysql> CREATE USER ’apiusr’@’localhost’ IDENTIFIED BY ’password’;
mysql> GRANT ALL ON *.* to ’apiusr’@’localhost’;
mysql> ALTER USER 'apiusr'@'localhost' IDENTIFIED BY 'password';
```

```
mysql> CREATE USER ’apiusr’@’localhost’ IDENTIFIED BY ’password’;
mysql> GRANT ALL ON *.* to ’apiusr’@’localhost’;
mysql> ALTER USER ’apiusr’@’localhost’ IDENTIFIED WITH mysql_native_password BY ’password’;
```

Create a basic restricted user you will use to connect to the database in the application:

```
CREATE USER 'basicusr'@'localhost' IDENTIFIED BY 'password';
GRANT SELECT, INSERT, UPDATE, DELETE ON testDB.Comment TO 'basicusr'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE ON testDB.VoteFor TO 'basicusr'@'localhost';
GRANT SELECT, INSERT, UPDATE ON testDB.User TO 'basicusr'@'localhost';
GRANT SELECT ON testDB.Document TO 'basicusr'@'localhost';
FLUSH PRIVILEGES;
```

## How to create and load the production database

Install MySQL, and create a test database and a test table.
To run the production data, `cd` into the `/productiondata` directory.

### Generating CSV

```
cd generation
python3 -m venv venv
pip install -r requirements.txt
python transform_doc.py
python generate_user.py
python generate_comment.py
python generate_upvote.py
```

### Populating DB

Make sure you are in the `/productiondata` and NOT `/productiondata/generation`

```
mysql -u root -p (or sudo mysql -u root)
mysql> CREATE DATABASE testDB;
mysql> USE testDB;
mysql> SET GLOBAL local_infile=ON;
mysql> quit;
mysql --local-infile=1 -u root -p -D testDB
mysql> source "**FULL PATH TO createTables.sql**"
mysql> source "**FULL PATH TO populateTables.sql**"
mysql> source "**FULL PATH TO outputTables.sql**"
```

## How to run backend locally

(Remember to run database beforehand)

1. `cd` into the `/backend` folder
2. Ensure you have Node installed. Using NVM to install it is recommended.

```
# run if this is your first time locally running the backend
npm i
```

3. Create a `.env` file and populate it accordingly, following the same structure as the .env.example file.
4. Start the server

```
npm run dev
```

You should see a couple messages, including 'Connected!', confirming your database connection is working. The backend server should be running on http://localhost:3000

## How to run frontend locally

1. `cd` into the `/frontend` folder
2. Install dependencies (skip if already installed)

```
# run if this is your first time locally running the frontend
npm i
```

3. Start the server

```
npm run dev
```

The frontend server should be running on http://localhost:5173/

## Features implemented
Each feature can be found implemented in the appropriate frontend page and backend router pertaining to the affected table (ex. For features affecting the Document table, DocumentList.js in pages folder, document.js in routes folder). 
- Viewing, creation, deletion, editing of users with Basic and Admin roles
- Users have their permissions to view pages/use routes based on their role
- Different levels of DB-level users to further safeguard against unintentional allowance of admin-level queries in basic user features
- Viewing, creation of documents
- Viewing, creation, and deletion of comments
- Creation and updating of votes on specific comments
- Auto liking your own comment on creation using transaction for atomicity
- Viewing presidents in the database sorted by relevance score
- Viewing most controversial comments
- Filtering documents based on tag
- Searching for documents based on keyword search of title
- Lossless compression on Comment table
- Generation of sample/production data, creation and population of tables
- Indexing on tables as detailed in report
- Appropriate delete cascades on ex. user delete
