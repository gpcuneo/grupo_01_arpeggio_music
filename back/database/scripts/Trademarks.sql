--
-- Estructura de tabla para la tabla `trademarks`
--
DROP TABLE IF EXISTS `trademarks`;
CREATE TABLE IF NOT EXISTS `trademarks`(
    `id` INT AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `createdAt` DateTime NOT NULL,
    `updatedAt` DateTime NOT NULL,
    PRIMARY KEY (`id`),
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;
--
-- Volcar la base de datos para la tabla `trademarks`
--
SET @datetimenow := NOW();
INSERT INTO `trademarks` (`name`, `createdAt`, `updatedAt`) VALUES
('CASIO',@datetimenow,@datetimenow),
('YAMAHA',@datetimenow,@datetimenow),
('PEARL',@datetimenow,@datetimenow),
('JACKSON',@datetimenow,@datetimenow),
('SAMSON',@datetimenow,@datetimenow),
('REMO',@datetimenow,@datetimenow),
('IBANEZ',@datetimenow,@datetimenow),


