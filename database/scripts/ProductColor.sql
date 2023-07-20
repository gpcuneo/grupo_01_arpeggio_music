--
-- Estructura de tabla para la tabla `ProductColor`
--

DROP TABLE IF EXISTS `product-color`;
CREATE TABLE IF NOT EXISTS `product-color` (
    `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `product_id` INT NOT NULL,
    `color_id` INT NOT NULL,
    `quantity` INT NOT NULL DEFAULT 0,
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`),
    FOREIGN KEY (`color_id`) REFERENCES `colors`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
--
-- Volcar la base de datos para la tabla `ProductColor`
--

INSERT INTO `product-color` (`product_id`, `color_id`,`quantity`) VALUES
(1, 1, 2),
(2, 3, 1),
(3, 4, 3),
(4, 5, 2);
