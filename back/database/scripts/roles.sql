DROP TABLE IF EXISTS `Roles`;
CREATE TABLE IF NOT EXISTS `Roles` (
    `id` int(10) NOT NULL AUTO_INCREMENT,
    `name` varchar(25) NOT NULL,
    `createdAt` DateTime NOT NULL,
    `updatedAt` DateTime NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=26 ;

--
-- Volcar la base de datos para la tabla `Roles`
--
SET @datetimenow := NOW();

INSERT INTO `Roles` (`name`, `createdAt`, `updatedAt`) VALUES
('user', @datetimenow, @datetimenow),
('admin', @datetimenow, @datetimenow),
('editor', @datetimenow, @datetimenow);