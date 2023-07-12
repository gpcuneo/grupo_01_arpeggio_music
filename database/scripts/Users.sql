--
-- Estructura de tabla para la tabla `Users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
    `id` CHAR(36) NOT NULL,
    `userName` varchar(36) NOT NULL,
    `firstName` VARCHAR(24) NOT NULL,
    `lastName` VARCHAR(24) NOT NULL,
    `email` TINYTEXT NOT NULL,
    `address` TINYTEXT NOT NULL,
    `id_location` TINYTEXT NOT NULL,
    `id_province` TINYTEXT NOT NULL,
    `dni` INT NOT NULL,
    `phone` INT NOT NULL,
    `password` CHAR(60) NOT NULL,
    `active` BOOL NOT NULL,
    `lastIP` TINYTEXT NOT NULL,
    `createdAt` DateTime NOT NULL,
    `updatedAt` DateTime NOT NULL,
    `image` TINYTEXT NOT NULL,
    `id_rol` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_rol`) REFERENCES 'roles'(`id`),
    FOREIGN KEY (`id_location`) REFERENCES 'locations'(`id`),
    FOREIGN KEY (`id_province`) REFERENCES 'provinces'(`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1;

--
-- Volcar la base de datos para la tabla `users`
--

-- INSERT INTO `users` (`id`, `userName`, `firstName`, `lastName`, `email`, `address`, `city`, `dni`, `phone`, `password`, `active`, `lastIP`, `createdAt`, `updatedAt`, `image`, `rol`) VALUES
-- (),
-- (),
-- (),

