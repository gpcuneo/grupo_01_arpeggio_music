--
-- Estructura de tabla para la tabla `Colors`
--

DROP TABLE IF EXISTS `colors`;
CREATE TABLE IF NOT EXISTS `colors` (
    `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `name` VARCHAR NOT NULL
)ENGINE=MyISAM  DEFAULT CHARSET=latin1;
--
-- Volcar la base de datos para la tabla `colors`
--

INSERT INTO `colors` (`id`, `name`) VALUES
(1, 'Verde'),
(2, 'Rojo'),
(3, 'Negro'),
(4, 'Azul'),
(5, 'Blanco'),
(6, 'Gris'),
(7, 'Amarrillo'),
(8, 'Púrpura'),
(9, 'Rosa'),
(10, 'Marrón'),
