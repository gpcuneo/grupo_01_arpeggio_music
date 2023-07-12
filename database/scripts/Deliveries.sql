--
-- Estructura de tabla para la tabla `Deliveries`
--

DROP TABLE IF EXISTS `deliveries`;
CREATE TABLE IF NOT EXISTS `deliveries`(
    `id` INT AUTO_INCREMENT NOT NULL,
    `type` INT NOT NULL,
    `createdAt` DateTime NOT NULL,
    `updatedAt` DateTime NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`type`) REFERENCES ''(`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1;

--
-- Volcar la base de datos para la tabla `deliveries`
--

-- INSERT INTO `deliveries` (`id`, `type`, `createdAt`, `updatedAt`) VALUES
-- (),
-- (),
-- (),
