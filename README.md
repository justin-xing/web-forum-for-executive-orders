# CS348_W25_Project

## How to create and load the sample database

Install MySQL, and create a test database and a test table (for milestone 0):

1. Make sure you are in the `sampledata` directory.
2.

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

1. `cd` into the `/backend` folder
2. Ensure you have Node installed. Using NVM to install it is recommended.

```
# run if this is your first time locally running the backend
npm i
```

3. Create a `.env` file and populate it accordingly.
4. Start the server

```
npm run dev
```

You should see a couple messages, including 'Connected!', confirming your database connection is working. The backend server should be running on http://localhost:3000

## How to run frontend locally

1. `cd` into the `/frontend` folder
2. Install dependencies (skip if already installed)

```
# run if this is your first time locally running the backend
npm i
```

3. Start the server

```
npm run dev
```

The frontend server should be running on http://localhost:5173/

## Features implemented so far

- Retrieving comments under a specific executive order
- Deletion of a user
