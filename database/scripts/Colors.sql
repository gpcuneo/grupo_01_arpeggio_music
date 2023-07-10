--
-- Estructura de tabla para la tabla `Colors`
--

DROP TABLE IF EXISTS `colors`;
CREATE TABLE IF NOT EXISTS `colors` (
    `id` INT NOT NULL,
    `name` VARCHAR NOT NULL,
    PRIMARY KEY (`id`)
)ENGINE=MyISAM  DEFAULT CHARSET=latin1;
--
-- Volcar la base de datos para la tabla `colors`
--

-- INSERT INTO `colors` (`id`, `name`) VALUES
-- (),
-- (),
