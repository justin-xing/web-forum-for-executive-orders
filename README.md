# CS348_W25_Project

## How to create and load the sample database
Install MySQL, and create a test database and a test table (for milestone 0):
```
mysql -u root -p (or sudo mysql -u root)
mysql> CREATE DATABASE testDB;
mysql> USE testDB;
mysql> CREATE TABLE student(uid DECIMAL(3, 0) NOT NULL PRIMARY KEY, name
VARCHAR(30), score DECIMAL(3, 2));
mysql> INSERT INTO student VALUES(1, "alice", 0.1);
mysql> INSERT INTO student VALUES(2, "bob", 0.4);
mysql> SELECT * FROM student;
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
You should see a couple messages, including 'connected!', confirming your database connection is working.
