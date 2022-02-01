-- -----------------------------------------------------
-- Schema avengers
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `avengers` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci ;
USE `avengers` ;

-- -----------------------------------------------------
-- Table `avengers`.`characters`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `avengers`.`characters` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `shortname` VARCHAR(45) NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;

INSERT INTO `characters` (`ID`, `name`, `shortname`) VALUES
(1009220, 'Captain America', 'capamerica'),
(1009368, 'Iron Man', 'ironman');
