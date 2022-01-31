var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "avengers"
});

con.connect(function(err) {
    if (err) throw err;
    var script = "CREATE TABLE IF NOT EXISTS `mydb`.`characters` (\
        `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,\
        `name` VARCHAR(45) NULL,\
        PRIMARY KEY (`ID`))\
      ENGINE = InnoDB";
    con.query(script, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
});

con.close();
/*
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var script = "CREATE TABLE IF NOT EXISTS `mydb`.`characters_has_characters` (\
        `char_ID` INT UNSIGNED NOT NULL,\
        `inter_ID` INT UNSIGNED NOT NULL,\
        PRIMARY KEY (`char_ID`, `inter_ID`),\
        INDEX `fk_characters_has_characters_characters1_idx` (`inter_ID` ASC),\
        INDEX `fk_characters_has_characters_characters_idx` (`char_ID` ASC),\
        CONSTRAINT `fk_characters_has_characters_characters`\
          FOREIGN KEY (`char_ID`)\
          REFERENCES `mydb`.`characters` (`ID`)\
          ON DELETE NO ACTION\
          ON UPDATE NO ACTION,\
        CONSTRAINT `fk_characters_has_characters_characters1`\
          FOREIGN KEY (`inter_ID`)\
          REFERENCES `mydb`.`characters` (`ID`)\
          ON DELETE NO ACTION\
          ON UPDATE NO ACTION)\
      ENGINE = InnoDB";
    con.query(script, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
});
*/