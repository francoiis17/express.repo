# Host: localhost  (Version 5.5.5-10.4.32-MariaDB)
# Date: 2024-07-03 12:03:39
# Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "clientes"
#

DROP TABLE IF EXISTS `clientes`;
CREATE TABLE `clientes` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='tabla de clientes';

#
# Data for table "clientes"
#

INSERT INTO `clientes` VALUES (1,'Marcia'),(2,'Francisco'),(3,'Javier'),(4,'Julio'),(5,'Ronaldo');

#
# Structure for table "usuarios"
#

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id_usuario` varchar(255) NOT NULL DEFAULT '',
  `cargo` varchar(255) NOT NULL DEFAULT '',
  `correo` varchar(255) NOT NULL DEFAULT '',
  `direccion` varchar(255) NOT NULL DEFAULT '',
  `nombre` varchar(255) NOT NULL DEFAULT '',
  `telefono` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='tabla de usuarios';

#
# Data for table "usuarios"
#

INSERT INTO `usuarios` VALUES ('CGqMUXy5nIVTW8eOE61nKyEpd4N2','chofer','franciscovicqy@gmail.com','Calle 21 de Calacoto','Francisco Azaria Baez','63136331');

#
# Structure for table "productos"
#

DROP TABLE IF EXISTS `productos`;
CREATE TABLE `productos` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` varchar(255) NOT NULL DEFAULT '',
  `centro` varchar(255) NOT NULL DEFAULT '',
  `norte` varchar(255) NOT NULL DEFAULT '',
  `otro` varchar(255) NOT NULL DEFAULT '',
  `placa` varchar(255) NOT NULL DEFAULT '',
  `sur` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='tabla de productos';

#
# Data for table "productos"
#

INSERT INTO `productos` VALUES (1,'CGqMUXy5nIVTW8eOE61nKyEpd4N2','500','350','750','ZXC-345','600');

#
# Structure for table "ordenes"
#

DROP TABLE IF EXISTS `ordenes`;
CREATE TABLE `ordenes` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` varchar(255) NOT NULL DEFAULT '',
  `usuario` varchar(255) NOT NULL DEFAULT '',
  `adicional` int(11) DEFAULT NULL,
  `canal` varchar(255) NOT NULL DEFAULT '',
  `comentario` varchar(255) DEFAULT NULL,
  `current` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `distribuidor` varchar(255) NOT NULL DEFAULT '',
  `fecha` varchar(255) NOT NULL DEFAULT '',
  `monto` int(11) NOT NULL DEFAULT 0,
  `placa` varchar(255) DEFAULT NULL,
  `ruta` varchar(255) NOT NULL DEFAULT '',
  `estado` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`Id`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `ordenes_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='tabla de ordenes';

#
# Data for table "ordenes"
#

INSERT INTO `ordenes` VALUES (1,'CGqMUXy5nIVTW8eOE61nKyEpd4N2','Francisco Azaria Baez',100,'tiendas de barrio','doble salida','2024-07-03 11:57:17','Marcia','2024-06-04',400,'ASD-678','zona central','completed'),(2,'CGqMUXy5nIVTW8eOE61nKyEpd4N2','Francisco Azaria Baez',50,'tiendas de barrio','media salida','2024-07-03 11:55:15','Marcia','2024-06-04',400,'ZXC-345','zona central','completed');
