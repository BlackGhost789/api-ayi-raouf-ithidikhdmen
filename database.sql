-- MariaDB dump 10.19  Distrib 10.11.6-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: foodApp2
-- ------------------------------------------------------
-- Server version	10.11.6-MariaDB-2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Admin`
--

DROP TABLE IF EXISTS `Admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Admin` (
  `idAdmin` int(11) NOT NULL AUTO_INCREMENT,
  `nomAdmin` varchar(45) NOT NULL,
  `prenomAdmin` varchar(45) NOT NULL,
  `emailAdmin` varchar(45) NOT NULL,
  `passwordAdmin` varchar(255) NOT NULL,
  PRIMARY KEY (`idAdmin`),
  UNIQUE KEY `idAdmin_UNIQUE` (`idAdmin`),
  UNIQUE KEY `emailAdmin_UNIQUE` (`emailAdmin`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Admin`
--

LOCK TABLES `Admin` WRITE;
/*!40000 ALTER TABLE `Admin` DISABLE KEYS */;
INSERT INTO `Admin` VALUES
(2,'admin','admin','admin@gmail.com','$2a$11$KbKFpPpWO8IdGM/YZp6RL.TAbV/GjcO3ond7zl7Y.txBMcz/YzJ76');
/*!40000 ALTER TABLE `Admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AimerBoisson`
--

DROP TABLE IF EXISTS `AimerBoisson`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AimerBoisson` (
  `idClient` int(11) NOT NULL,
  `idBoisson` int(11) NOT NULL,
  PRIMARY KEY (`idClient`,`idBoisson`),
  KEY `fk_AimerBoisson_1_idx` (`idBoisson`),
  CONSTRAINT `fk_AimerBoisson_1` FOREIGN KEY (`idBoisson`) REFERENCES `Boisson` (`idBoisson`),
  CONSTRAINT `fk_AimerBoisson_2` FOREIGN KEY (`idClient`) REFERENCES `Client` (`idClient`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AimerBoisson`
--

LOCK TABLES `AimerBoisson` WRITE;
/*!40000 ALTER TABLE `AimerBoisson` DISABLE KEYS */;
INSERT INTO `AimerBoisson` VALUES
(6,4),
(9,17);
/*!40000 ALTER TABLE `AimerBoisson` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AimerPlat`
--

DROP TABLE IF EXISTS `AimerPlat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AimerPlat` (
  `idClient` int(11) NOT NULL,
  `idPlat` int(11) NOT NULL,
  PRIMARY KEY (`idClient`,`idPlat`),
  KEY `fk_AimerPlat_2_idx` (`idPlat`),
  CONSTRAINT `fk_AimerPlat_1` FOREIGN KEY (`idClient`) REFERENCES `Client` (`idClient`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_AimerPlat_2` FOREIGN KEY (`idPlat`) REFERENCES `Plat` (`idPlat`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AimerPlat`
--

LOCK TABLES `AimerPlat` WRITE;
/*!40000 ALTER TABLE `AimerPlat` DISABLE KEYS */;
INSERT INTO `AimerPlat` VALUES
(6,9),
(9,14),
(9,18),
(9,19);
/*!40000 ALTER TABLE `AimerPlat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Boisson`
--

DROP TABLE IF EXISTS `Boisson`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Boisson` (
  `idBoisson` int(11) NOT NULL AUTO_INCREMENT,
  `nomBoisson` varchar(45) NOT NULL,
  `imageBoisson` varchar(800) DEFAULT NULL,
  `prixBoisson` float NOT NULL,
  `idCategorie` int(11) NOT NULL,
  PRIMARY KEY (`idBoisson`),
  KEY `fk_Boisson_1_idx` (`idCategorie`),
  CONSTRAINT `fk_Boisson_1` FOREIGN KEY (`idCategorie`) REFERENCES `Categorie` (`idCategorie`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Boisson`
--

LOCK TABLES `Boisson` WRITE;
/*!40000 ALTER TABLE `Boisson` DISABLE KEYS */;
INSERT INTO `Boisson` VALUES
(4,'Milkshake Vanille','milkshakevanille.jpg',500,8),
(5,'Milkshake Lotus','milkshakelotus.jpg',500,8),
(6,'Milkshake Oreo','milkshakeoreo.jpg',500,8),
(7,'Milkshake Banane','milkshakebanane.jpg',500,8),
(8,'Milkshake Fraise','milkshakefraise.jpg',500,8),
(9,'Milkshake Cookies','milkshakecookiespeanutbutter.jpg',550,8),
(10,'Milkshake Nutella','milkshakenutella.jpg',550,8),
(11,'Milkshake Moka ','milkshakemokaglacevanille.webp',600,8),
(12,'Milkshake Fruit db','milkshakefruitdesbois.jpg',550,8),
(13,'Mojito Classique','mojitoclassique.jpg',550,9),
(14,'Mojito Grenadine','mojitogrenadine.jpg',550,9),
(15,'Mojito Ananas','mojitoananas.jpg',550,9),
(16,'Mojito Fraise','mojitofraise.jpg',550,9),
(17,'Jus d\'ananas','jusdananas.jpg',550,9),
(18,'Jus de Peche','jusdepeche.jpg',550,9),
(19,'Jus d\'orange','jusdorangepresse.jpg',550,9),
(20,'Jus de Mangue','jusdemangue.jpg',550,9),
(21,'Jus de Citron','jusdecitron.jpg',550,9),
(22,'Pinky','pinky.jpg',550,9),
(23,'Pina Colada','pinacolada.jpg',550,9),
(24,'Sunrise','sunrise.jpg',550,9),
(25,'Bora Bora','borabora.jpg',550,9);
/*!40000 ALTER TABLE `Boisson` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Categorie`
--

DROP TABLE IF EXISTS `Categorie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Categorie` (
  `idCategorie` int(11) NOT NULL AUTO_INCREMENT,
  `nomCategorie` varchar(45) NOT NULL,
  `imageCategorie` varchar(45) NOT NULL,
  PRIMARY KEY (`idCategorie`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Categorie`
--

LOCK TABLES `Categorie` WRITE;
/*!40000 ALTER TABLE `Categorie` DISABLE KEYS */;
INSERT INTO `Categorie` VALUES
(5,'Burgers','cheese-burger(3).png'),
(6,'Baguette & Wrap','burrito.png'),
(7,'poutine','poutine.png'),
(8,'milkshake','milkshake.png'),
(9,'classique','orange-juice.png');
/*!40000 ALTER TABLE `Categorie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Client`
--

DROP TABLE IF EXISTS `Client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Client` (
  `idClient` int(11) NOT NULL AUTO_INCREMENT,
  `nomClient` varchar(15) NOT NULL,
  `prenomClient` varchar(15) DEFAULT NULL,
  `passwordClient` varchar(100) DEFAULT NULL,
  `emailClient` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idClient`),
  UNIQUE KEY `idClient_UNIQUE` (`idClient`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Client`
--

LOCK TABLES `Client` WRITE;
/*!40000 ALTER TABLE `Client` DISABLE KEYS */;
INSERT INTO `Client` VALUES
(6,'client','client','$2a$10$zxShDhWwhwPNm3Zj6QBaAOhe3Baxtp1hFm8DI6XaSUFGIs93sv9nS','client@gmail.com'),
(7,'Touati','Mania','$2a$10$.sJFFFQl7ivR.asHw/OIt.Qs7ausrl4IIllHAFbJc8vE/wn9/pf6m','client2@gmail.com'),
(8,'amine','touati','$2a$10$C6xAyZkVktiEL3MhpI1yM./Klbp6.31qzXcqp0zlPxp1EI68R7DWK','aminet@gmail.com'),
(9,'smail','rima','$2a$10$VtiQk1ynXe1dE2ZgCSJ9cur6iLlEHCiQq0yoDpvLPV8jQoC1WjEGS','rimas9938@gmail.com');
/*!40000 ALTER TABLE `Client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Commande`
--

DROP TABLE IF EXISTS `Commande`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Commande` (
  `idCommande` int(11) NOT NULL AUTO_INCREMENT,
  `location` varchar(145) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `idClient` int(11) DEFAULT NULL,
  `idLivreur` int(11) DEFAULT NULL,
  `state` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`idCommande`),
  KEY `fk_Commande_3_idx` (`idClient`),
  KEY `fk_Commande_4_idx` (`idLivreur`),
  CONSTRAINT `fk_Commande_3` FOREIGN KEY (`idClient`) REFERENCES `Client` (`idClient`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Commande_4` FOREIGN KEY (`idLivreur`) REFERENCES `Livreur` (`idLivreur`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Commande`
--

LOCK TABLES `Commande` WRITE;
/*!40000 ALTER TABLE `Commande` DISABLE KEYS */;
INSERT INTO `Commande` VALUES
(44,'hello','2002-08-08',6,4,1),
(45,'hello','2002-08-08',6,4,1),
(46,'hello','2002-08-08',6,5,1),
(47,'hello','2002-08-08',6,4,1),
(48,'hello','2002-08-08',6,5,1),
(49,'hello','2002-08-08',6,NULL,0),
(50,'hello','2002-08-08',6,4,1),
(51,'hello','2002-08-08',6,4,1),
(52,'hello','2002-08-08',6,NULL,0),
(53,'hello','2002-08-08',6,7,0);
/*!40000 ALTER TABLE `Commande` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Favoris`
--

DROP TABLE IF EXISTS `Favoris`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Favoris` (
  `idFavoris` int(11) NOT NULL AUTO_INCREMENT,
  `idClient` int(11) NOT NULL,
  `idPlat` int(11) DEFAULT NULL,
  `idBoisson` int(11) DEFAULT NULL,
  PRIMARY KEY (`idFavoris`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Favoris`
--

LOCK TABLES `Favoris` WRITE;
/*!40000 ALTER TABLE `Favoris` DISABLE KEYS */;
/*!40000 ALTER TABLE `Favoris` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Livreur`
--

DROP TABLE IF EXISTS `Livreur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Livreur` (
  `idLivreur` int(11) NOT NULL AUTO_INCREMENT,
  `nomLivreur` varchar(45) NOT NULL,
  `prenomLivreur` varchar(45) NOT NULL,
  `email` varchar(30) NOT NULL,
  `passwordLivreur` varchar(115) NOT NULL,
  `disponible` tinyint(4) NOT NULL,
  PRIMARY KEY (`idLivreur`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Livreur`
--

LOCK TABLES `Livreur` WRITE;
/*!40000 ALTER TABLE `Livreur` DISABLE KEYS */;
INSERT INTO `Livreur` VALUES
(4,'Livreur','Livreur','livreur@gmail.com','$2a$10$AvXFI/Z6.1K/Ty/EtX4CxecJYe2OHJFMSOl9ogXqLpM63D7MtdSW6',0),
(5,'amine','touati','livreur2@gmail.com','$2a$10$18QcWGSZAmK1Njyqhfv0XerRy2chZNuLYUR03pbsVrj8Kr6Jn5SHG',0),
(6,'xxxx','bbbb','touati@gmail.con','$2a$10$uximjfa1zSbaB3I/aeXAZ.3GUpLAkLpLj/H4Et0JTYu2n/R5CSn26',0),
(7,'ksksn','nsnznz','hnmmb@gmail.com','$2a$10$YHwtgNJV5oAXSzBxFNLoGeQoCyo0FvIDvYbez8FoPc3qrU7baTHye',0);
/*!40000 ALTER TABLE `Livreur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Notification`
--

DROP TABLE IF EXISTS `Notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Notification` (
  `idNotification` int(11) NOT NULL AUTO_INCREMENT,
  `nomNotification` varchar(45) DEFAULT NULL,
  `text` varchar(45) DEFAULT NULL,
  `idLivreur` int(11) DEFAULT NULL,
  `idClient` int(11) DEFAULT NULL,
  PRIMARY KEY (`idNotification`),
  KEY `fk_Notification_1_idx` (`idClient`),
  KEY `fk_Notification_2_idx` (`idLivreur`),
  CONSTRAINT `fk_Notification_1` FOREIGN KEY (`idClient`) REFERENCES `Client` (`idClient`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Notification_2` FOREIGN KEY (`idLivreur`) REFERENCES `Livreur` (`idLivreur`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Notification`
--

LOCK TABLES `Notification` WRITE;
/*!40000 ALTER TABLE `Notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `Notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Plat`
--

DROP TABLE IF EXISTS `Plat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Plat` (
  `idPlat` int(11) NOT NULL AUTO_INCREMENT,
  `nomPlat` varchar(45) NOT NULL,
  `imagePlat` varchar(800) DEFAULT NULL,
  `prixPlat` float NOT NULL,
  `ingredient` varchar(800) DEFAULT NULL,
  `idCategorie` int(11) DEFAULT NULL,
  PRIMARY KEY (`idPlat`),
  KEY `fk_Plat_1_idx` (`idCategorie`),
  CONSTRAINT `fk_Plat_1` FOREIGN KEY (`idCategorie`) REFERENCES `Categorie` (`idCategorie`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Plat`
--

LOCK TABLES `Plat` WRITE;
/*!40000 ALTER TABLE `Plat` DISABLE KEYS */;
INSERT INTO `Plat` VALUES
(7,'Chiken Original','chikenoriginal.jpg',500,'Sauce Budz,Poulet ',5),
(8,'Chiken Spicy','chikenspicy.jpg',550,'Sauce spicy,Poulet crispy spicy,Salade,Tomate,Rondelles de piments,oignons caramélisès,Fromage slice',5),
(9,'Chiken Deluxe','chikendeluxe.jpg',600,'Sauce a l\'ail,Poulet crispy,Salade,Tomate,Oignons caramélisès,Fromage Gouda,Fromage Slice',5),
(10,'Chiken Supreme','chikensupreme.jpg',600,'Sauce fumée,Poulet crispy,Salade,Tomate,Oignons caramélisès,Fromage Gouda,Fromage slice',5),
(11,'Mixte','mixte.jpg',850,'Sauce Budz,Poulet crispy,Viande hachée,Salade,Tomate,Fromage gruyére,Fromage slice',5),
(12,'Beef Original','beeforiginal.jpg',500,'Sauce Budz,Viande hachée,Salade,Tomate,Oignons rouge,Cornichon,Fromage slice',5),
(13,'Beef Spicy','Beeef.jpg',550,'Sauce spicy,Viande hachée,Salade,Tomate,,oignons rouge,Fromage slice',5),
(14,'Camembert Miel','camembertmiel.jpg',650,'Sauce honey,Viande hachée,Salade,Tomate,Oignons rouge,Cornichon,bacon',5),
(15,'Beef Bacon','beefbacon.jpg',700,'Sauce fumée,Viande hachée,Salade,Tomate,Oignons rouge,Cornichon,Bacon',5),
(16,'French Veggie Baguette','frenchveggiebaguette.jpg',500,'Salade,Tomate,Camembert,Sauce pesto verde',6),
(17,'Beef Baguette','beefbaguette.jpg',800,'Sauce au poivre,Steak,Champignons caramélisès,Oignons,Tomate,Laitue',6),
(18,'Chiken Baguette','chikenbaguette.jpg',700,'Sauce a l\'ail,Poulet tenders,Salade,Oignons,Tomate,Fromage Slice',6),
(19,'Wrap Chiken Cheese','wrapchikencheese.jpg',550,'Sauce a l\'ail,Poulet tenders,Salade,Oignons rouge,Tomate,Fromage slice\"',6),
(20,'Poutine Chiken Fries','poutinechikenfries.jpg',550,'Frites,Poulet Tenders,Sauce fromagére canadienne',7),
(21,'Poutine Canadienne','poutinecanadienne.jpg',550,'Frites,Poulet Fumé,Sauce fromagére canadienne',7);
/*!40000 ALTER TABLE `Plat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `archive`
--

DROP TABLE IF EXISTS `archive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `archive` (
  `idActeur` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(30) NOT NULL,
  `rote` varchar(10) NOT NULL,
  PRIMARY KEY (`idActeur`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `archive`
--

LOCK TABLES `archive` WRITE;
/*!40000 ALTER TABLE `archive` DISABLE KEYS */;
INSERT INTO `archive` VALUES
(3,'admin@gmail.com','Admin'),
(4,'client@gmail.com','Client'),
(17,'livreur@gmail.com','Livreur'),
(18,'client2@gmail.com','Client'),
(19,'aminet@gmail.com','Client'),
(20,'livreur2@gmail.com','Livreur'),
(21,'rimas9938@gmail.com','Client'),
(22,'touati@gmail.con','Livreur'),
(23,'hnmmb@gmail.com','Livreur');
/*!40000 ALTER TABLE `archive` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contienBoisson`
--

DROP TABLE IF EXISTS `contienBoisson`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contienBoisson` (
  `idCommande` int(11) NOT NULL,
  `idBoisson` int(11) NOT NULL,
  `quantite` int(11) NOT NULL,
  PRIMARY KEY (`idCommande`,`idBoisson`,`quantite`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contienBoisson`
--

LOCK TABLES `contienBoisson` WRITE;
/*!40000 ALTER TABLE `contienBoisson` DISABLE KEYS */;
INSERT INTO `contienBoisson` VALUES
(44,4,3),
(45,4,4),
(45,16,2);
/*!40000 ALTER TABLE `contienBoisson` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contienPlat`
--

DROP TABLE IF EXISTS `contienPlat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contienPlat` (
  `idCommande` int(11) NOT NULL,
  `idPlat` int(11) NOT NULL,
  `quantite` int(11) NOT NULL,
  PRIMARY KEY (`idCommande`,`idPlat`),
  KEY `fk_contien_1_idx` (`idCommande`),
  KEY `fk_contien_2_idx` (`idPlat`),
  CONSTRAINT `fk_contien_1` FOREIGN KEY (`idCommande`) REFERENCES `Commande` (`idCommande`),
  CONSTRAINT `fk_contien_2` FOREIGN KEY (`idPlat`) REFERENCES `Plat` (`idPlat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contienPlat`
--

LOCK TABLES `contienPlat` WRITE;
/*!40000 ALTER TABLE `contienPlat` DISABLE KEYS */;
INSERT INTO `contienPlat` VALUES
(44,7,2),
(45,16,3),
(45,19,2),
(46,9,2),
(46,16,3),
(47,20,2),
(48,7,2),
(48,20,3),
(49,20,3),
(49,21,2),
(50,9,2),
(50,14,6),
(51,19,1),
(51,21,5),
(52,19,1),
(52,21,5),
(53,14,3);
/*!40000 ALTER TABLE `contienPlat` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-20 23:59:35
