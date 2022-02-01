require('dotenv').config();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  //database: "avengers"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("connected");
});

var sql = "CREATE SCHEMA IF NOT EXISTS `avengers` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Table created");
});

sql = "use avengers";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Using avengers db");
});


sql = "CREATE TABLE IF NOT EXISTS `avengers`.`characters` (\
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,\
  `name` VARCHAR(45) NULL,\
  `shortname` VARCHAR(45) NULL,\
  PRIMARY KEY (`ID`))\
ENGINE = InnoDB";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Table created");
});

sql = "INSERT INTO `characters` (`ID`, `name`, `shortname`) VALUES\
(1009220, 'Captain America', 'capamerica'),\
(1009368, 'Iron Man', 'ironman')";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Datas inserted");
});

//con.close();
