-- MySQL Script generated by MySQL Workbench
-- Thu Nov  3 20:21:29 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema automotel
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema automotel
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `automotel` DEFAULT CHARACTER SET utf8 ;
USE `automotel` ;

-- -----------------------------------------------------
-- Table `automotel`.`permission`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `automotel`.`permission` (
  `code` VARCHAR(255) NOT NULL,
  `name` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`code`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `automotel`.`group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `automotel`.`group` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `automotel`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `automotel`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `groupId` INT NULL,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NULL,
  `document` VARCHAR(19) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_group1_idx` (`groupId` ASC) VISIBLE,
  CONSTRAINT `fk_user_group1`
    FOREIGN KEY (`groupId`)
    REFERENCES `automotel`.`group` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `automotel`.`groupPermission`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `automotel`.`groupPermission` (
  `code` VARCHAR(255) NOT NULL,
  `group` INT NOT NULL,
  INDEX `fk_groupPermission_permission_idx` (`code` ASC) VISIBLE,
  INDEX `fk_groupPermission_group1_idx` (`group` ASC) VISIBLE,
  CONSTRAINT `fk_groupPermission_permission`
    FOREIGN KEY (`code`)
    REFERENCES `automotel`.`permission` (`code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_groupPermission_group1`
    FOREIGN KEY (`group`)
    REFERENCES `automotel`.`group` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `automotel`.`bedroom`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `automotel`.`bedroom` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `number` INT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `automotel`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `automotel`.`customer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `document` VARCHAR(14) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `automotel`.`bedroomHistory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `automotel`.`bedroomHistory` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `customerId` INT NOT NULL,
  `bedroomId` INT NOT NULL,
  `enterAt` DATETIME NOT NULL,
  `cleanedAt` DATETIME NULL,
  `leaveAt` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_bedroomHistory_customer1_idx` (`customerId` ASC) VISIBLE,
  INDEX `fk_bedroomHistory_bedroom1_idx` (`bedroomId` ASC) VISIBLE,
  INDEX `fk_bedroomHistory_user1_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `fk_bedroomHistory_customer1`
    FOREIGN KEY (`customerId`)
    REFERENCES `automotel`.`customer` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_bedroomHistory_bedroom1`
    FOREIGN KEY (`bedroomId`)
    REFERENCES `automotel`.`bedroom` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_bedroomHistory_user1`
    FOREIGN KEY (`userId`)
    REFERENCES `automotel`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `automotel`.`stock`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `automotel`.`stock` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `productName` VARCHAR(255) NULL,
  `quantity` INT NULL,
  `price` FLOAT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `automotel`.`consumption`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `automotel`.`consumption` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `stockId` INT NOT NULL,
  `bedroomHistoryId` INT NOT NULL,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_consumption_stock1_idx` (`stockId` ASC) VISIBLE,
  INDEX `fk_consumption_bedroomHistory1_idx` (`bedroomHistoryId` ASC) VISIBLE,
  CONSTRAINT `fk_consumption_stock1`
    FOREIGN KEY (`stockId`)
    REFERENCES `automotel`.`stock` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_consumption_bedroomHistory1`
    FOREIGN KEY (`bedroomHistoryId`)
    REFERENCES `automotel`.`bedroomHistory` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `automotel`.`session`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `automotel`.`session` (
  `id` VARCHAR(36) NOT NULL,
  `userId` INT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_session_user1_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `fk_session_user1`
    FOREIGN KEY (`userId`)
    REFERENCES `automotel`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
