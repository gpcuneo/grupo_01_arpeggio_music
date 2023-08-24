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
    `id_town` INT NOT NULL,
    `id_rol` INT NOT NULL,
    `dni` INT NOT NULL,
    `phone` INT NOT NULL,
    `password` CHAR(60) NOT NULL,
    `active` BOOLEAN NOT NULL,
    `lastIP` TINYTEXT NOT NULL,
    `image` TINYTEXT NOT NULL,
    `createdAt` DateTime NOT NULL,
    `updatedAt` DateTime NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_rol`) REFERENCES `roles`(`id`),
    FOREIGN KEY (`id_town`) REFERENCES `towns`(`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

--
-- Volcar la base de datos para la tabla `users`
--
SET @datetimenow := NOW();
INSERT INTO `users` (`id`, `userName`, `firstName`, `lastName`, `email`, `address`, `id_town`, `id_rol`, `dni`, `phone`, `password`, `active`, `lastIP`, `image`, `createdAt`, `updatedAt`) VALUES
("d72f98b1-dbb2-41d8-88e1-9c0e8eb4fc7c","pepegrillo","Pepe","Grillo","pepe.grillo@gmail.com","Calle falsa 123",163,2,30123456,1134879328,"$2a$10$alxXME9Q.ot51jTDmhzdJuAHXumUXgqvOmHpy0u7O7dQUGGDTr1me",true,"172.18.0.1","1687041398999-slow_internet.jpeg",@datetimenow, @datetimenow),
("b3b91cc1-4f6a-4bb5-bd2f-20d3925ef59e","cosmefulanito","Cosme","Fulanito","cosme.fulanito@hotmail.com","San Lorenzo 123",212,1,30135790,1167873923,"$2a$10$OEOgKoxA5Pi0nkqw5hiSkO7ZMBm38GUikYotxIF8CsCrpWRjdwW72",true,"172.18.0.1","1687041478406-200112anonymous.jpeg",@datetimenow, @datetimenow),
("f5431d56-a2c6-470d-9f88-90eb8621b323","arodriguez","Andrea","Rodriguez","arodriguez@outlook.com","Alguna Calle 1234",14,1,30123123,1147568902,"$2a$10$abzCDSfHT3pVUtnpFPKvD.PzoUE.NeVw8JwfeefimcfOg.5ccT8hu",true,"172.18.0.1","1687041556551-5652.jpg",@datetimenow, @datetimenow);


