-- MySQL dump 10.13  Distrib 5.7.19, for Win64 (x86_64)
--
-- Host: localhost    Database: blog_db
-- ------------------------------------------------------
-- Server version	5.7.19-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `createTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `comment` text,
  `update_time` timestamp NULL DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `authorId` int(10) unsigned NOT NULL,
  `postId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `comment-post_idx` (`postId`),
  KEY `comment-user_idx` (`authorId`),
  CONSTRAINT `comment-post` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `comment-user` FOREIGN KEY (`authorId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES ('2017-01-19 08:14:07','hello there',NULL,1,1,NULL),('2017-01-19 08:14:07','will',NULL,3,1,22),('2017-01-19 08:14:07','teasting',NULL,4,1,22);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `content` text,
  `tags` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `createTime` timestamp NULL DEFAULT NULL,
  `updateTime` timestamp NULL DEFAULT NULL,
  `authorId` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Post_user_idx` (`authorId`),
  CONSTRAINT `fk_Post_user` FOREIGN KEY (`authorId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'first blog!','It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)','tech','status',NULL,NULL,1),(2,'second Blog','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed arcu diam, pretium nec nunc a, lobortis suscipit sem. Fusce vitae ex vel ligula ornare faucibus a eu lacus. Aliquam congue quam tortor. Cras bibendum porta convallis. Donec egestas, tortor et suscipit suscipit, purus est iaculis felis, id facilisis elit velit at nunc. Pellentesque in nisi sollicitudin, placerat purus ut, efficitur ex. Maecenas urna urna, venenatis a dui in, ullamcorper ultrices tortor. Nullam eu tempus nunc. Aenean et convallis augue, at ullamcorper leo. Proin justo libero, euismod at nunc non, egestas semper dolor. In hac habitasse platea dictumst. Donec vel varius magna. Phasellus porta ut dui sed malesuada.\n\nMorbi turpis eros, malesuada in magna mollis, volutpat ornare ligula. Mauris ornare ligula et viverra pharetra. Donec eget pharetra lorem. Cras feugiat tortor ac mi lacinia posuere. In sit amet erat commodo, tempor nulla non, tempus velit. Morbi erat ante, efficitur non feugiat a, posuere non metus. Morbi quis cursus odio.\n\nInteger tempor ultrices auctor. Morbi sit amet risus cursus, faucibus ex eget, molestie magna. Morbi ornare dolor non mi tempus tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ut quam eleifend, pharetra orci in, fermentum lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tristique risus at ante ultricies, ac varius magna aliquam.','tech','status',NULL,NULL,1),(3,'third Blog','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel consectetur sapien. Proin posuere nisi sit amet purus cursus, eu finibus velit condimentum. Pellentesque tempus, urna porttitor venenatis auctor, urna turpis finibus justo, nec interdum turpis ante quis leo. Integer ornare ullamcorper risus vel cursus. In porta ac elit quis eleifend. Donec at dui a leo bibendum mattis eget semper dolor. Maecenas pulvinar enim et nulla pulvinar dictum. Maecenas id pulvinar quam.','tech','status',NULL,NULL,2),(4,'4th one','some conte3','tech','status',NULL,NULL,2),(21,'this is the title','this is some content','tags','status','2017-01-19 08:14:07',NULL,2),(22,'fdafd','adfadf',NULL,'','2017-01-19 08:14:07',NULL,1),(23,'this is a test','tesafklj;ldkjflkajdf',NULL,'','2017-01-19 08:14:07',NULL,2),(24,'Hi there','This is the first one',NULL,'','2017-01-19 08:14:07',NULL,1),(25,'2nd one','dafadfa',NULL,'','2017-01-19 08:14:07',NULL,1),(26,'Hi from Jose','kjlakmf;lkajdlf;kjadf',NULL,'','2017-01-19 08:14:07',NULL,12),(27,'hello again','lkajdf;lakjdflkjadf',NULL,'','2017-01-19 08:14:07',NULL,12),(28,'hi','hello',NULL,'','2017-01-19 08:14:07',NULL,1),(29,'dfadfaf','adfadfa',NULL,'','2017-01-19 08:14:07',NULL,1),(30,'hi','hello',NULL,'','2017-01-19 08:14:07',NULL,1),(31,'test','adgadga',NULL,'','2017-01-19 08:14:07',NULL,1),(32,'hello','hellllllllllllllllo',NULL,'','2017-01-19 08:14:07',NULL,1);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posttag`
--

DROP TABLE IF EXISTS `posttag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posttag` (
  `postId` int(11) NOT NULL,
  `tagID` int(11) NOT NULL,
  PRIMARY KEY (`postId`,`tagID`),
  KEY `Tag_idx` (`tagID`),
  CONSTRAINT `Post` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `Tag` FOREIGN KEY (`tagID`) REFERENCES `tag` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posttag`
--

LOCK TABLES `posttag` WRITE;
/*!40000 ALTER TABLE `posttag` DISABLE KEYS */;
/*!40000 ALTER TABLE `posttag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` char(60) NOT NULL,
  `email` varchar(60) DEFAULT NULL,
  `fName` varchar(30) DEFAULT NULL,
  `lName` varchar(30) DEFAULT NULL,
  `resetPasswordToken` varchar(50) DEFAULT NULL,
  `resetPasswordExpire` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'greg','$2a$10$dgrBoDF5TquKBt5GqBKfAO9zvxgxjdm1fCsUf7OyUhAjFBp/LQ.1q','gregk78@yahoo.com',NULL,NULL,NULL,NULL),(2,'test','$2a$10$7aT.qulyij7Lpa70VxOhPuQTCOY3cCobondWwDnGaOEabJ1i2l7q2','test@test.com',NULL,NULL,NULL,NULL),(3,'f','$2a$10$6d9k64H0iBNyln75qB3rOeO.0H85i.SwcVs0kbk88oUVVAUuJ/kQy','test2@gmail.com',NULL,NULL,NULL,NULL),(4,'jason','$2a$10$PKDIcB6nF3T0bGTBLmxMu.GSVAJNOr6XbYKwBY7N17xtt7kBk.2wy',NULL,NULL,NULL,NULL,NULL),(5,'brian','$2a$10$HkVAnflGjHf420HexxrEKOoJxJcbyZzArFga9KqwqxkUOJU/85VmK',NULL,NULL,NULL,NULL,NULL),(6,'bill','$2a$10$D4x2A15IW/AY3EX3SO6pvOl5yeEqpRWxHNpUKpB7hEygvK6tSFNNW',NULL,NULL,NULL,NULL,NULL),(7,'lewis','$2a$10$Q5pAWTic5SEGmfO52cmp/eoUGyzDKj4BPUuefo51c0GBr19BNrDCq',NULL,NULL,NULL,NULL,NULL),(8,'john','$2a$10$LntcZrl8bMEtOB0JwolOA.gYoxnvcITdp2W3oRVPUkJa5vyPh8kQS',NULL,NULL,NULL,NULL,NULL),(9,'hi','$2a$10$WAGFJUAZPwToRwTPQh83KOOYu/uBZSS2p9AEUIdkh4L3WOgWhhXee',NULL,NULL,NULL,NULL,NULL),(10,'z','$2a$10$QdRSKh0jAGoPUJwdhVFiWeXW/qd6ic8m8t4cQIy6lRaM7Yrmd1nwK',NULL,NULL,NULL,NULL,NULL),(11,'gknight','$2a$10$GS2Gtkc0Boe5re4INgdX7uLQFieeOFWhiceWznOgzfj7vu8pjjj7a',NULL,NULL,NULL,NULL,NULL),(12,'jose','$2a$10$4R6.jqqOTnfALcesoHpDguCgiLeYhhjwfltDQnRUm/m7xgxyv5qsS','j@l.com','Jose','Wilson',NULL,NULL),(13,'g','$2a$10$4qbBh8IXSjCkIRtEUieZAuzWyHpNqzRyP/AfuV8qEFGXdOZmyA8pC','g@g.com','g','g',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-04  0:22:16
