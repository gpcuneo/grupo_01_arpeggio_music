--
-- Estructura de tabla para la tabla `trademark`
--
DROP TABLE IF EXISTS `trademark`;
CREATE TABLE IF NOT EXISTS `trademark`(
    `id` INT AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `createdAt` DateTime NOT NULL,
    `updatedAt` DateTime NOT NULL,
    PRIMARY KEY (`id`),
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;
--
-- Volcar la base de datos para la tabla `trademark`
--
SET @datetimenow := NOW();
INSERT INTO `trademark` (`name`, `createdAt`, `updatedAt`) VALUES
('CASIO',@datetimenow,@datetimenow),
('YAMAHA',@datetimenow,@datetimenow),
('PEARL',@datetimenow,@datetimenow),
('JACKSON',@datetimenow,@datetimenow),
('SAMSON',@datetimenow,@datetimenow),
('REMO',@datetimenow,@datetimenow),
('IBANEZ',@datetimenow,@datetimenow),


['CASIO','YAMAHA','PEARL','JACKSON','SAMSON','REMO','IBANEZ']