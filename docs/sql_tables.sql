CREATE TABLE IF NOT EXISTS `p2peye_fe`.`user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `name` VARCHAR(100) NULL,
  `cname` VARCHAR(100) NULL,
  `description` VARCHAR(2000) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));


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
