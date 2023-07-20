--
-- Estructura de tabla para la tabla `Sales`
--

DROP TABLE IF EXISTS `sales`;
CREATE TABLE IF NOT EXISTS `sales`(
    `id` INT AUTO_INCREMENT NOT NULL,
    `order_id` INT NOT NULL,
    `product-color_id` INT NOT NULL,
    `quantity` INT NOT NULL,
    `price` FLOAT NOT NULL,
    `createdAt` DateTime NOT NULL,
    `updatedAt` DateTime NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`),
    FOREIGN KEY (`product-color_id`) REFERENCES `product-color`(`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

--
-- Volcar la base de datos para la tabla `sales`
--

-- INSERT INTO `sales` (`id`, `order_id`, `product_id`, `color`, `quantity`, `price`, `createdAt`, `updatedAt`) VALUES
-- (),
-- (),
-- (),
