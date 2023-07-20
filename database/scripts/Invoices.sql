--
-- Estructura de tabla para la tabla `Invoices`
--

DROP TABLE IF EXISTS `invoices`;
CREATE TABLE IF NOT EXISTS `invoices`(
    `id` INT AUTO_INCREMENT NOT NULL,
    `order_id` INT NOT NULL,
    `sub_total` FLOAT NOT NULL,
    `taxes` FLOAT NOT NULL,
    `total` FLOAT NOT NULL,
    `createdAt` DateTime NOT NULL,
    `updatedAt` DateTime NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

--
-- Volcar la base de datos para la tabla `invoices`
--

-- INSERT INTO `invoices` (`id`, `order_id`, `sub_total`, `taxes`,`total`,`createdAt`, `updatedAt`) VALUES
-- (),
-- (),
-- (),