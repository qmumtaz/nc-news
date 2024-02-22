# Northcoders News API

Important tip : Make sure you have Node.js and PostgreSQL installed.
-  Node.js: Ensure you have at least Node.js version 14 or later.
- PostgreSQL: Use PostgreSQL version 10 or later.

# Project summary
- NC_news is a dynamic API inspired by platforms similar to Reddit. 

- The hosted version : https://nc-news-9quh.onrender.com/api

# SetUp

Setting Up a Node.js and PostgreSQL Project:

First clone the repo from GitHub
- git clone <repository_url>
- cd <project_folder>
 - node . to open the directory into visual studio code

Make sure to install the dependencies : 
- npm install
- have a quick look in the package.json to see if the dependencies are installed

Create .ENV files 
- .env.developement - for your development
- .env.test - for your tests

Make sure to run the database to create a local database
- npm run setup-dbs

Seeding the database
- npm run seed

Check databases are created
- in the command line psql 
- \l to display all the databases
- \c to connect to the databases

Build and tests
- go to the test folder create a test file with __.test.js
- npm t to run all test 
- npm t __{filename}.test to run a singular test


With in the each .env file make sure to have your database connection string 
- e.g for .env.development should be like this with in the file 
- PGDATABASE=nc_news
- make sure your .gitignore includes .env files should look something similar to this .env.*


# Final steps

- now your done hurray everything should be set up properly and happy coding to you.