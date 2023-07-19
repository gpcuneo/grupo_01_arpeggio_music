DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
    `id` int(10) NOT NULL AUTO_INCREMENT,
    `rol` varchar(25) NOT NULL,
    `createdAt` DateTime NOT NULL,
    `updatedAt` DateTime NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=26 ;

--
-- Volcar la base de datos para la tabla `roles`
--
SET @datetimenow := NOW();

INSERT INTO `roles` (`rol`, `createdAt`, `updatedAt`) VALUES
('user', @datetimenow, @datetimenow),
('admin', @datetimenow, @datetimenow),
('editor', @datetimenow, @datetimenow);