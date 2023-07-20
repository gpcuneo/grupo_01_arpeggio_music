--
-- Estructura de tabla para la tabla `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
    `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(40) NOT NULL,
    `img` VARCHAR(40) NOT NULL,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
--
-- Volcar la base de datos para la tabla `categories`
--
SET @datetimenow := NOW();
INSERT INTO `categories` (`name`, `img`, `createdAt`, `updatedAt`) VALUES
('Guitarras', 'guitarracriolla-01.jpg' ,@datetimenow,@datetimenow),
('Bajos', 'guitarracriolla-01.jpg' ,@datetimenow,@datetimenow),
('Teclados', 'guitarracriolla-01.jpg' ,@datetimenow,@datetimenow),
('Violines', 'guitarracriolla-01.jpg' ,@datetimenow,@datetimenow),
('Ukeleles', 'guitarracriolla-01.jpg' ,@datetimenow,@datetimenow),
('Baterias', 'guitarracriolla-01.jpg' ,@datetimenow,@datetimenow),
('Audio DJ', 'guitarracriolla-01.jpg' ,@datetimenow,@datetimenow),
('Consolas', 'guitarracriolla-01.jpg' ,@datetimenow,@datetimenow),
('Microfonos', 'guitarracriolla-01.jpg' ,@datetimenow,@datetimenow)
