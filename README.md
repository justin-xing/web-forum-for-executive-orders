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

## How to run app locally

Ensure you have Node installed. Using NVM to install it is recommended.

```
node server.js
```

You should see a couple messages, including 'Connected!', confirming your database connection is working.
