# CS348_W25_Project

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

Create a user you will use to connect to the database in the application:

```
mysql> CREATE USER ’apiusr’@’localhost’ IDENTIFIED BY ’password’;
mysql> GRANT ALL ON *.* to ’apiusr’@’localhost’;
mysql> ALTER USER ’apiusr’@’localhost’ IDENTIFIED WITH mysql_native_password BY ’password’;
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

Create a user you will use to connect to the database in the application:

```
mysql> CREATE USER ’apiusr’@’localhost’ IDENTIFIED BY ’password’;
mysql> GRANT ALL ON *.* to ’apiusr’@’localhost’;
mysql> ALTER USER ’apiusr’@’localhost’ IDENTIFIED WITH mysql_native_password BY ’password’;
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

## Features implemented so far
Note: associated query file paths can be found in the imports of the respective backend route files. You can also find them in the **basic-features** folder.
- Retrieving all documents per president, which can be filtered based on tag (Basic Feature 1). Backend endpoint can be found at **backend/routes/document.js**. Frontend page can be found at **frontend/.../pages/.../DocumentList.jsx**.
- Upon clicking on a document, its details are retrieved and displayed, and all comments associated with the document are retrieved and displayed (Basic Feature 2). Backend endpoint can be found at **backend/routes/comment.js**. Frontend page can be found at **frontend/.../pages/DocumentPage.jsx**.
- Admin panel to display all users and allow for the deletion of a user (Basic Feature 3). Backend endpoint can be found at **backend/routes/user.js**. Frontend page can be found at **frontend/.../pages/.../DeletePage.jsx**.
