--
-- Estructura de tabla para la tabla `Deliveries`
--

DROP TABLE IF EXISTS `deliveries`;
CREATE TABLE IF NOT EXISTS `deliveries`(
    `id` INT AUTO_INCREMENT NOT NULL,
    `type` varchar(25) NOT NULL,
    `createdAt` DateTime NOT NULL,
    `updatedAt` DateTime NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

--
-- Volcar la base de datos para la tabla `deliveries`
--
SET @datetimenow := NOW();

INSERT INTO `deliveries` (`type`, `createdAt`, `updatedAt`) VALUES
('Retiro en el local', @datetimenow, @datetimenow),
('OCA', @datetimenow, @datetimenow),
('Andreani', @datetimenow, @datetimenow),
('Mensajeria privada', @datetimenow, @datetimenow);