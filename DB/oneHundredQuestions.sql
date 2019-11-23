-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema onehundredquestions
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `onehundredquestions` ;

-- -----------------------------------------------------
-- Schema onehundredquestions
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `onehundredquestions` DEFAULT CHARACTER SET utf8 ;
USE `onehundredquestions` ;

-- -----------------------------------------------------
-- Table `question`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `question` ;

CREATE TABLE IF NOT EXISTS `question` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `question` TEXT(65000) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `username` VARCHAR(100) NULL,
  `password` VARCHAR(200) NULL,
  `associate_username` VARCHAR(100) NULL,
  `role` VARCHAR(45) NOT NULL,
  `enabled` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`username` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `answer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `answer` ;

CREATE TABLE IF NOT EXISTS `answer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `answer` TEXT(65000) NULL,
  `user_id` INT NOT NULL,
  `question_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_answer_user_idx` (`user_id` ASC),
  INDEX `fk_answer_question1_idx` (`question_id` ASC),
  CONSTRAINT `fk_answer_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_answer_question1`
    FOREIGN KEY (`question_id`)
    REFERENCES `question` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS admin@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'admin'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `question`
-- -----------------------------------------------------
START TRANSACTION;
USE `onehundredquestions`;
INSERT INTO `question` (`id`, `question`) VALUES (1, 'How many kids do you want?');
INSERT INTO `question` (`id`, `question`) VALUES (2, 'What values do you want to install in your children?');
INSERT INTO `question` (`id`, `question`) VALUES (3, 'How do you want to discipline your kids?');
INSERT INTO `question` (`id`, `question`) VALUES (4, 'What would you do if one of your children said he was homosexual?');
INSERT INTO `question` (`id`, `question`) VALUES (5, 'What if our children didn\'t want to go to college?');
INSERT INTO `question` (`id`, `question`) VALUES (6, 'How much say do children have in a family?');
INSERT INTO `question` (`id`, `question`) VALUES (7, 'How comfortable are you around children?');
INSERT INTO `question` (`id`, `question`) VALUES (8, 'Would you be opposed to having our parents watch the children so we can spend time alone together?');
INSERT INTO `question` (`id`, `question`) VALUES (9, 'Would you put your children in private or public school?');
INSERT INTO `question` (`id`, `question`) VALUES (10, 'What are your thoughts on home schooling?');
INSERT INTO `question` (`id`, `question`) VALUES (11, 'Would you be willing to adopt if we couldn\'t have kids?');
INSERT INTO `question` (`id`, `question`) VALUES (12, 'Would you be willing to seek medical treatment if we couldn\'t have kids naturally?');
INSERT INTO `question` (`id`, `question`) VALUES (13, 'Do you believe it\'s OK to discipline your child in public?');
INSERT INTO `question` (`id`, `question`) VALUES (14, 'How do you feel about paying for your kid\'s college education?');
INSERT INTO `question` (`id`, `question`) VALUES (15, 'How far apart do you want kids?');
INSERT INTO `question` (`id`, `question`) VALUES (16, 'Would you want someone to stay home with the kids or use day care?');
INSERT INTO `question` (`id`, `question`) VALUES (17, 'How would you feel if our kids wanted to join the military rather than go to college?');
INSERT INTO `question` (`id`, `question`) VALUES (18, 'How involved do you want grandparents to be in our parenting?');
INSERT INTO `question` (`id`, `question`) VALUES (19, 'How will we handle parental decisions?');
INSERT INTO `question` (`id`, `question`) VALUES (20, 'Would you be willing to go to marriage counseling if we were having marital problems?');
INSERT INTO `question` (`id`, `question`) VALUES (21, 'If there is a disagreement between me and your family, whose side do you choose?');
INSERT INTO `question` (`id`, `question`) VALUES (22, 'How do you handle disagreements?');
INSERT INTO `question` (`id`, `question`) VALUES (23, 'Would you ever consider divorce?');
INSERT INTO `question` (`id`, `question`) VALUES (24, 'Would you rather discuss issues as they arise or wait until you have a few problems?');
INSERT INTO `question` (`id`, `question`) VALUES (25, 'How would you communicate you aren\'t satisfied sexually?');
INSERT INTO `question` (`id`, `question`) VALUES (26, 'What is the best way to handle disagreements in a marriage?');
INSERT INTO `question` (`id`, `question`) VALUES (27, 'How can I be better at communicating with you?');
INSERT INTO `question` (`id`, `question`) VALUES (28, 'What are your views on infidelity?');
INSERT INTO `question` (`id`, `question`) VALUES (29, 'What are your religious views on marriage?');
INSERT INTO `question` (`id`, `question`) VALUES (30, 'What\'s more important, work or family?');
INSERT INTO `question` (`id`, `question`) VALUES (31, 'What are your political views?');
INSERT INTO `question` (`id`, `question`) VALUES (32, 'What are your views on birth control?');
INSERT INTO `question` (`id`, `question`) VALUES (33, 'Would you rather be rich and miserable or poor and happy?');
INSERT INTO `question` (`id`, `question`) VALUES (34, 'Who will make the biggest decisions of the household?');
INSERT INTO `question` (`id`, `question`) VALUES (35, 'What would you do if someone said something bad about me?');
INSERT INTO `question` (`id`, `question`) VALUES (36, 'Would you follow the advice of your family before your spouse?');
INSERT INTO `question` (`id`, `question`) VALUES (37, 'What do you believe the role of a wife is?');
INSERT INTO `question` (`id`, `question`) VALUES (38, 'Who should do household chores?');
INSERT INTO `question` (`id`, `question`) VALUES (39, 'What do you believe the role of a husband is?');
INSERT INTO `question` (`id`, `question`) VALUES (40, 'How do you feel about debt?');
INSERT INTO `question` (`id`, `question`) VALUES (41, 'Would you share all money with your spouse or split the money into different accounts?');
INSERT INTO `question` (`id`, `question`) VALUES (42, 'What are your views on saving money?');
INSERT INTO `question` (`id`, `question`) VALUES (43, 'What are your views on spending money?');
INSERT INTO `question` (`id`, `question`) VALUES (44, 'What if we both want something but can\'t afford both?');
INSERT INTO `question` (`id`, `question`) VALUES (45, 'How well do you budget?');
INSERT INTO `question` (`id`, `question`) VALUES (46, 'Do you feel it is important to save for retirement?');
INSERT INTO `question` (`id`, `question`) VALUES (47, 'Would you be willing to get a second job if we had financial problems?');
INSERT INTO `question` (`id`, `question`) VALUES (48, 'Do you have any debt?');
INSERT INTO `question` (`id`, `question`) VALUES (49, 'What if a family member wants to borrow a large sum of money?');
INSERT INTO `question` (`id`, `question`) VALUES (50, 'Who will take care of the financial matters of the household?');
INSERT INTO `question` (`id`, `question`) VALUES (51, 'Do you enjoy traveling?');
INSERT INTO `question` (`id`, `question`) VALUES (52, 'How often would you like to travel?');
INSERT INTO `question` (`id`, `question`) VALUES (53, 'Where would you like to travel?');
INSERT INTO `question` (`id`, `question`) VALUES (54, 'How important is spending time alone to you?');
INSERT INTO `question` (`id`, `question`) VALUES (55, 'How would you feel about me going on a trip with the girls (boys) for a couple of weeks?');
INSERT INTO `question` (`id`, `question`) VALUES (56, 'How important is spending time with friends to you?');
INSERT INTO `question` (`id`, `question`) VALUES (57, 'What would be the perfect weekday evening to you?');
INSERT INTO `question` (`id`, `question`) VALUES (58, 'What would we do if we both had a break from work, but each of us had different ideas on how to spend it?');
INSERT INTO `question` (`id`, `question`) VALUES (59, 'How often would you want to visit your family?');
INSERT INTO `question` (`id`, `question`) VALUES (60, 'How often will your family visit us?');
INSERT INTO `question` (`id`, `question`) VALUES (61, 'How often would you want my family to visit?');
INSERT INTO `question` (`id`, `question`) VALUES (62, 'How often would you want to visit my family?');
INSERT INTO `question` (`id`, `question`) VALUES (63, 'Do you have a family history of diseases or genetic abnormalities?');
INSERT INTO `question` (`id`, `question`) VALUES (64, 'What if one of your family members said he disliked me?');
INSERT INTO `question` (`id`, `question`) VALUES (65, 'How would you handle holiday family visits?');
INSERT INTO `question` (`id`, `question`) VALUES (66, 'If your parents became ill, would you take them in?');
INSERT INTO `question` (`id`, `question`) VALUES (67, 'If my parents became ill, would you mind taking them in?');
INSERT INTO `question` (`id`, `question`) VALUES (68, 'Does anyone in your family suffer from alcoholism?');
INSERT INTO `question` (`id`, `question`) VALUES (69, 'What is your medical family history?');
INSERT INTO `question` (`id`, `question`) VALUES (70, 'Would you be opposed to mental health treatment?');
INSERT INTO `question` (`id`, `question`) VALUES (71, 'If I had to change my diet because of medical concerns, would you be willing to change yours?');
INSERT INTO `question` (`id`, `question`) VALUES (72, 'Are you willing to exercise with me to improve our health?');
INSERT INTO `question` (`id`, `question`) VALUES (73, 'Where do you want to live?');
INSERT INTO `question` (`id`, `question`) VALUES (74, 'Would you mind moving if I had to relocate with my job?');
INSERT INTO `question` (`id`, `question`) VALUES (75, 'What would you do if we fell out of love?');
INSERT INTO `question` (`id`, `question`) VALUES (76, 'What are your career aspirations?');
INSERT INTO `question` (`id`, `question`) VALUES (77, 'What would you like to be doing five or ten years from now?');
INSERT INTO `question` (`id`, `question`) VALUES (78, 'What do you think is the best way to keep the love alive in a marriage?');
INSERT INTO `question` (`id`, `question`) VALUES (79, 'How do you think life will change if we got married?');
INSERT INTO `question` (`id`, `question`) VALUES (80, 'What is the best thing about marriage?');
INSERT INTO `question` (`id`, `question`) VALUES (81, 'What is the worst thing about marriage?');
INSERT INTO `question` (`id`, `question`) VALUES (82, 'What is your idea of the best weekend?');
INSERT INTO `question` (`id`, `question`) VALUES (83, 'How important are wedding anniversaries to you?');
INSERT INTO `question` (`id`, `question`) VALUES (84, 'How would you like to spend special days?');
INSERT INTO `question` (`id`, `question`) VALUES (85, 'What kind of grandparent do you want to be someday?');
INSERT INTO `question` (`id`, `question`) VALUES (86, 'What type of house do you want to live in?');
INSERT INTO `question` (`id`, `question`) VALUES (87, 'What is your biggest fear about marriage?');
INSERT INTO `question` (`id`, `question`) VALUES (88, 'What excites you about getting married?');
INSERT INTO `question` (`id`, `question`) VALUES (89, 'What do wedding rings mean to you?');
INSERT INTO `question` (`id`, `question`) VALUES (90, 'Are you afraid to talk to me about anything?');
INSERT INTO `question` (`id`, `question`) VALUES (91, 'What do you think would improve our relationship?');
INSERT INTO `question` (`id`, `question`) VALUES (92, 'What would be one thing you would change about our relationship?');
INSERT INTO `question` (`id`, `question`) VALUES (93, 'Do you have any doubts about the future of our relationship?');
INSERT INTO `question` (`id`, `question`) VALUES (94, 'Do you believe love can pull you through anything?');
INSERT INTO `question` (`id`, `question`) VALUES (95, 'Is there anything you don\'t trust about me?');
INSERT INTO `question` (`id`, `question`) VALUES (96, 'Which would you choose - dishes or laundry?');
INSERT INTO `question` (`id`, `question`) VALUES (97, 'Do you like pets?');
INSERT INTO `question` (`id`, `question`) VALUES (98, 'How many pets do you want?');
INSERT INTO `question` (`id`, `question`) VALUES (99, 'What to do you want to do during retirement?');
INSERT INTO `question` (`id`, `question`) VALUES (100, 'At what age would you like to retire?');

COMMIT;


-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `onehundredquestions`;
INSERT INTO `user` (`id`, `name`, `username`, `password`, `associate_username`, `role`, `enabled`) VALUES (1, 'Karol', 'karoline.silvaramos@yahoo.com.br', '$2a$10$ThDcro/TrLaqN3tSZF06SO6fVoWcmHCLcSPZH91G1X7v0GBD4UEAG', 'casey.e.asher@outlook.com', 'user', 1);
INSERT INTO `user` (`id`, `name`, `username`, `password`, `associate_username`, `role`, `enabled`) VALUES (2, 'Casey', 'casey.e.asher@outlook.com', '$2a$10$owwalnv4sKYG1k0pNFbHLejmfFMxeknvujq.gj.iWJOoe6Dfr9Y1u', 'karoline.silvaramos@yahoo.com.br', 'admin', 1);
INSERT INTO `user` (`id`, `name`, `username`, `password`, `associate_username`, `role`, `enabled`) VALUES (3, 'Sally', 'sally.asher09', '$2a$10$qgDxgQ0dProrPqt9XGIo8ulJPDOR2UzYiAp3gpiRwnBfQGBhSUD7K', 'gruffmctuff', 'user', 1);
INSERT INTO `user` (`id`, `name`, `username`, `password`, `associate_username`, `role`, `enabled`) VALUES (4, 'Austin', 'gruffmctuff', '$2a$10$U9VJzxN71iwAST.pvChpnOozTduHoMVUMMgb4P4uYt82nBbZxw7.e', 'sally.asher09', 'user', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `answer`
-- -----------------------------------------------------
START TRANSACTION;
USE `onehundredquestions`;
INSERT INTO `answer` (`id`, `answer`, `user_id`, `question_id`) VALUES (1, 'I want 1 or 3 children ', 1, 1);
INSERT INTO `answer` (`id`, `answer`, `user_id`, `question_id`) VALUES (2, '1-3 children is best. If more children happen, or if no-children happen: life is still okay. If we are unable to have children, I would like to adopt a child. My parents had five children and I think that is a lot of life to manage. ', 2, 1);
INSERT INTO `answer` (`id`, `answer`, `user_id`, `question_id`) VALUES (3, '29', 4, 1);
INSERT INTO `answer` (`id`, `answer`, `user_id`, `question_id`) VALUES (4, '31', 4, 1);

COMMIT;

