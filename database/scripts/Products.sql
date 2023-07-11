--
-- Estructura de tabla para la tabla `Products`
--

DROP TABLE IF EXISTS `products`;   --condicional (verifica si existe otra tabla `products`)
CREATE TABLE IF NOT EXISTS `products` (
    `id` INT PRIMARY KEY NOT NULL,
    `name` VARCHAR(35) NOT NULL,
    `characteristics` VARCHAR(150) NOT NULL,
    `price` FLOAT NOT NULL,
    `discount` FLOAT NULL,
    `stock` INT NOT NULL,
    `category_id` INT NOT NULL,
    `description` TEXT NOT NULL,
    `store` TEXT NULL,
    `image` VARCHAR NOT NULL,
    FOREIGN KEY (`category_id`) REFERENCES 'category'(`id`)
)ENGINE=MyISAM  DEFAULT CHARSET=latin1;
--
-- Volcar la base de datos para la tabla `products`
--

-- INSERT INTO `products` (`id`, `name`, `characteristics`, `price`, `discount`, `stock`, `category_id`, `description`, `store`, `image`) VALUES
-- (),
-- (),
-- (),