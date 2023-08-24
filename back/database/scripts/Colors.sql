--
-- Estructura de tabla para la tabla `Colors`
--

DROP TABLE IF EXISTS `colors`;
CREATE TABLE IF NOT EXISTS `colors` (
    `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(40) NOT NULL,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
--
-- Volcar la base de datos para la tabla `colors`
--
SET @datetimenow := NOW();
INSERT INTO `colors` (`name`,`createdAt`, `updatedAt`) VALUES
('Verde',@datetimenow,@datetimenow),
('Rojo',@datetimenow,@datetimenow),
('Negro',@datetimenow,@datetimenow),
('Azul',@datetimenow,@datetimenow),
('Blanco',@datetimenow,@datetimenow),
('Gris',@datetimenow,@datetimenow),
('Amarrillo',@datetimenow,@datetimenow),
('Púrpura',@datetimenow,@datetimenow),
('Rosa',@datetimenow,@datetimenow),
('Marrón',@datetimenow,@datetimenow);
