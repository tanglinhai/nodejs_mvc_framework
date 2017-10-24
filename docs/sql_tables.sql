DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `cname` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `description` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`) USING BTREE,
  UNIQUE KEY `id_UNIQUE` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `website_uploads`;
CREATE TABLE `website_uploads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(100) NOT NULL,
  `userid` int(11) NOT NULL,
  `date` date NOT NULL,
  `subject_name` varchar(100) DEFAULT NULL,
  `subject_description` varchar(2000) DEFAULT NULL,
  `filenameTarget` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS `components`;
CREATE TABLE `components` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `ctitle` varchar(200) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `code` blob NOT NULL,
  `userid` int(100) NOT NULL,
  `date` date DEFAULT NULL,
  `filenameTarget` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS `plugins`;
CREATE TABLE `plugins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `ctitle` varchar(200) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `code` blob NOT NULL,
  `userid` int(100) NOT NULL,
  `date` date DEFAULT NULL,
  `filenameTarget` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
