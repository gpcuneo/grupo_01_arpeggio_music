--
-- Estructura de tabla para la tabla `provincias`
--

DROP TABLE IF EXISTS `Provinces`;
CREATE TABLE IF NOT EXISTS `Provinces` (
    `id` int(100) NOT NULL AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    `createdAt` DateTime NOT NULL,
    `updatedAt` DateTime NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
--
-- Volcar la base de datos para la tabla `Provinces`
--

SET @datetimenow := NOW();
INSERT INTO `Provinces` (`name`, `createdAt`, `updatedAt`) VALUES
('Buenos Aires', @datetimenow, @datetimenow),
('Buenos Aires-GBA', @datetimenow, @datetimenow),
('Capital Federal', @datetimenow, @datetimenow),
('Catamarca', @datetimenow, @datetimenow),
('Chaco', @datetimenow, @datetimenow),
('Chubut', @datetimenow, @datetimenow),
('Córdoba', @datetimenow, @datetimenow),
('Corrientes', @datetimenow, @datetimenow),
('Entre Ríos', @datetimenow, @datetimenow),
('Formosa', @datetimenow, @datetimenow),
('Jujuy', @datetimenow, @datetimenow),
('La Pampa', @datetimenow, @datetimenow),
('La Rioja', @datetimenow, @datetimenow),
('Mendoza', @datetimenow, @datetimenow),
('Misiones', @datetimenow, @datetimenow),
('Neuquén', @datetimenow, @datetimenow),
('Río Negro', @datetimenow, @datetimenow),
('Salta', @datetimenow, @datetimenow),
('San Juan', @datetimenow, @datetimenow),
('San Luis', @datetimenow, @datetimenow),
('Santa Cruz', @datetimenow, @datetimenow),
('Santa Fe', @datetimenow, @datetimenow),
('Santiago del Estero', @datetimenow, @datetimenow),
('Tierra del Fuego', @datetimenow, @datetimenow),
('Tucumán', @datetimenow, @datetimenow);