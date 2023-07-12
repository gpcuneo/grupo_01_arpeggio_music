--
-- Estructura de tabla para la tabla `Sales`
--

DROP TABLE IF EXISTS `sales`;
CREATE TABLE IF NOT EXISTS `sales`(
    `id` INT AUTO_INCREMENT NOT NULL,
    `order_id` INT NOT NULL,
    `product_id` INT NOT NULL,
    `color` VARCHAR NOT NULL,
    `quantity` NUMBER NOT NULL,    --preguntar
    `price` FLOAT NOT NULL,
    `createdAt` DateTime NOT NULL,
    `updatedAt` DateTime NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`order_id`) REFERENCES 'orders'(`id`),
    FOREIGN KEY (`product_id`) REFERENCES 'products'(`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1;

--
-- Volcar la base de datos para la tabla `sales`
--

-- INSERT INTO `sales` (`id`, `order_id`, `product_id`, `color`, `quantity`, `price`, `createdAt`, `updatedAt`) VALUES
-- (),
-- (),
-- (),
