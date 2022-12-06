CREATE SCHEMA `ensinotec` ;

CREATE TABLE `ensinotec`.`aluno` (
  `idaluno` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `cpf` VARCHAR(45) NULL,
  `dt_nasc` VARCHAR(45) NULL,
  `tel` VARCHAR(45) NULL,
  `ra` VARCHAR(45) NULL,
  PRIMARY KEY (`idaluno`));
  
  SELECT * FROM ensinotec.aluno;