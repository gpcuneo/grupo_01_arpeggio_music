--
-- Estructura de tabla para la tabla `Orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders`(
    `id` INT AUTO_INCREMENT NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `delivery_id` INT NOT NULL,
    `createdAt` DateTime NOT NULL,
    `updatedAt` DateTime NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
    FOREIGN KEY (`delivery_id`) REFERENCES `deliveries`(`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

--
-- Volcar la base de datos para la tabla `orders`
--

-- INSERT INTO `orders` (`id`, `user_id`, `delivery_id`, `createdAt`, `updatedAt`) VALUES
-- (),
-- (),
-- (),