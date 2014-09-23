DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `validate_flight_group`(GroupId INT(3))
BEGIN  DECLARE specialty CONDITION FOR SQLSTATE '45000'; IF GroupID IS NULL THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Custom error'; END IF; END$$

DELIMITER ;

DROP TRIGGER IF EXISTS `check_f_groupid`;
DELIMITER //
CREATE TRIGGER `check_f_groupid` BEFORE INSERT ON `Flight`
 FOR EACH ROW BEGIN CALL validate_flight_group(NEW.GroupId); END
//
DELIMITER ;


CREATE DEFINER = `root`@`localhost` PROCEDURE `validate_flight` ( IN `GroupId` INT( 3 ) , IN `Code` INT( 2 ) , IN `SheduleId` INT( 12 ) , IN `Status` INT( 1 ) ) NOT DETERMINISTIC CONTAINS SQL SQL SECURITY DEFINER BEGIN DECLARE specialty CONDITION FOR SQLSTATE '45000';

IF Code >100 THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'invalid code';

END IF ;

IF STATUS >1 THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'invalid status';

END IF ;

IF SheduleId IS NULL THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid SheduleId';

END IF ;

IF GroupID IS NULL THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid Grp';

END IF ;

END

CREATE TRIGGER `check_f_groupid` BEFORE INSERT ON `Flight`
FOR EACH ROW BEGIN CALL validate_flight(NEW.GroupId,NEW.Code,NEW.SheduleId,NEW.Status); END

DROP TRIGGER IF EXISTS `check_f_groupid` ;

CREATE DEFINER = `root`@`localhost` TRIGGER `check_fu_groupid` BEFORE UPDATE ON `Flight` FOR EACH ROW BEGIN CALL validate_flight(
NEW.GroupId,
NEW.Code,
NEW.SheduleId,
NEW.Status
);

END

