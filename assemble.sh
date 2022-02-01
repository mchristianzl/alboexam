#! /bin/bash

echo "instaling modules ... md5"
npm install md5
echo "instaling modules ... mysql"
npm install mysql
echo "instaling modules ... typescript"
#sudo npm install -g typescript
echo "instaling modules ... dontenv"
npm install dotenv --save

# create database
echo "creating database"
node -r dotenv/config db-tables.js
