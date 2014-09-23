-- phpMyAdmin SQL Dump
-- version 3.5.8.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 24, 2014 at 12:22 AM
-- Server version: 5.5.32-0ubuntu0.13.04.1
-- PHP Version: 5.4.9-4ubuntu2.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `AirLine`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `validate_flight`(IN `GroupId` INT(3), IN `Code` INT(2), IN `SheduleId` INT(12), IN `Status` INT(1))
BEGIN  DECLARE specialty CONDITION FOR SQLSTATE '45000'; IF Code > 100 THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='invalid code' ; END IF; IF Status > 1 THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'invalid status'; END IF; IF SheduleId IS NULL THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid SheduleId'; END IF; IF GroupID IS NULL THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid Grp'; END IF; END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `Airport`
--

CREATE TABLE IF NOT EXISTS `Airport` (
  `Id` int(5) NOT NULL AUTO_INCREMENT,
  `City` varchar(100) NOT NULL,
  `Country` varchar(100) NOT NULL,
  `Name` varchar(100) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `Airport`
--

INSERT INTO `Airport` (`Id`, `City`, `Country`, `Name`) VALUES
(1, 'Colombo', 'Sri Lnaka', 'Bandaranayake'),
(2, 'Newdilli', 'India', 'Newdilli'),
(3, 'Ny', 'USA', 'NY international'),
(4, 'Sydny', 'Australia', 'Sydny intrnational'),
(5, 'Maththala', 'Sri Lanka', 'Maththala intrenational');

-- --------------------------------------------------------

--
-- Table structure for table `Class`
--

CREATE TABLE IF NOT EXISTS `Class` (
  `Id` int(3) NOT NULL AUTO_INCREMENT,
  `Type` varchar(20) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Customer`
--

CREATE TABLE IF NOT EXISTS `Customer` (
  `Id` int(10) NOT NULL AUTO_INCREMENT,
  `Email` varchar(40) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Flight`
--

CREATE TABLE IF NOT EXISTS `Flight` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `GroupId` int(3) NOT NULL,
  `Status` tinyint(1) NOT NULL,
  `SheduleId` int(5) NOT NULL,
  `Code` int(10) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `GroupId` (`GroupId`),
  KEY `SheduleId` (`SheduleId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=50009 ;

--
-- Triggers `Flight`
--
DROP TRIGGER IF EXISTS `check_f_groupid`;
DELIMITER //
CREATE TRIGGER `check_f_groupid` BEFORE INSERT ON `Flight`
 FOR EACH ROW BEGIN CALL validate_flight(NEW.GroupId,NEW.Code,NEW.SheduleId,NEW.Status); END
//
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `Group`
--

CREATE TABLE IF NOT EXISTS `Group` (
  `Id` int(10) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `Group`
--

INSERT INTO `Group` (`Id`) VALUES
(1),
(2),
(3),
(4),
(5),
(6),
(7),
(8),
(9),
(10);

-- --------------------------------------------------------

--
-- Table structure for table `Name`
--

CREATE TABLE IF NOT EXISTS `Name` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `CustomerId` int(10) NOT NULL,
  `Seq` int(3) NOT NULL,
  `Name` varchar(40) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `CustomerId` (`CustomerId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Seat`
--

CREATE TABLE IF NOT EXISTS `Seat` (
  `Id` int(10) NOT NULL AUTO_INCREMENT,
  `FlightId` int(10) NOT NULL,
  `Status` tinyint(1) NOT NULL,
  `ClassId` int(3) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `FlightId` (`FlightId`),
  KEY `ClassId` (`ClassId`),
  KEY `ClassId_2` (`ClassId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Shedule`
--

CREATE TABLE IF NOT EXISTS `Shedule` (
  `Id` int(5) NOT NULL AUTO_INCREMENT,
  `Type` varchar(20) NOT NULL,
  `Date` date NOT NULL,
  `Time` int(5) NOT NULL,
  `Status` tinyint(1) NOT NULL,
  `Deparutre` int(5) NOT NULL,
  `Arrive` int(5) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `Time` (`Time`),
  KEY `Deparutre` (`Deparutre`),
  KEY `Arrive` (`Arrive`),
  KEY `Time_2` (`Time`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=50001 ;

-- --------------------------------------------------------

--
-- Table structure for table `Ticket`
--

CREATE TABLE IF NOT EXISTS `Ticket` (
  `Id` int(10) NOT NULL AUTO_INCREMENT,
  `SheduleId` int(10) NOT NULL,
  `SeatId` int(10) NOT NULL,
  `CustomerId` int(10) NOT NULL,
  `Price` int(10) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `SeatId` (`SeatId`),
  KEY `CustomerId` (`CustomerId`),
  KEY `SeatId_2` (`SeatId`),
  KEY `SheduleId` (`SheduleId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=50001 ;

-- --------------------------------------------------------

--
-- Table structure for table `TravelTime`
--

CREATE TABLE IF NOT EXISTS `TravelTime` (
  `Id` int(5) NOT NULL AUTO_INCREMENT,
  `Departure` time NOT NULL,
  `Arrive` time NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `TravelTime`
--

INSERT INTO `TravelTime` (`Id`, `Departure`, `Arrive`) VALUES
(1, '00:12:30', '00:14:30'),
(2, '00:14:50', '00:16:45'),
(3, '00:15:30', '00:17:30'),
(4, '00:22:30', '00:00:30'),
(5, '00:13:30', '00:18:30'),
(6, '00:22:30', '00:02:30');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Flight`
--
ALTER TABLE `Flight`
  ADD CONSTRAINT `Flight_ibfk_1` FOREIGN KEY (`SheduleId`) REFERENCES `Shedule` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Flight_ibfk_2` FOREIGN KEY (`GroupId`) REFERENCES `Group` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Name`
--
ALTER TABLE `Name`
  ADD CONSTRAINT `Name_ibfk_1` FOREIGN KEY (`CustomerId`) REFERENCES `Customer` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Seat`
--
ALTER TABLE `Seat`
  ADD CONSTRAINT `Seat_ibfk_2` FOREIGN KEY (`ClassId`) REFERENCES `Class` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Seat_ibfk_3` FOREIGN KEY (`FlightId`) REFERENCES `Flight` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Shedule`
--
ALTER TABLE `Shedule`
  ADD CONSTRAINT `Shedule_ibfk_1` FOREIGN KEY (`Time`) REFERENCES `TravelTime` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Shedule_ibfk_2` FOREIGN KEY (`Deparutre`) REFERENCES `Airport` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Shedule_ibfk_3` FOREIGN KEY (`Arrive`) REFERENCES `Airport` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Ticket`
--
ALTER TABLE `Ticket`
  ADD CONSTRAINT `Ticket_ibfk_3` FOREIGN KEY (`SheduleId`) REFERENCES `Shedule` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
