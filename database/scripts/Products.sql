--
-- Estructura de tabla para la tabla `Products`
--

DROP TABLE IF EXISTS `products`;   --condicional (verifica si existe otra tabla `products`)
CREATE TABLE IF NOT EXISTS `products` (
    `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
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

INSERT INTO `products` (`id`, `name`, `characteristics`, `price`, `discount`, `stock`, `category_id`, `description`, `store`, `image`) VALUES
(1,'Batería Acústica','Batería Acústica 5 cuerpos 20 14 12 10 Yamaha Rydeen Rdp0f5',250000,20,1,'', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nobis eveniet harum non, suscipit mollitia recusandae quidem blanditiis','Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nobis eveniet harum non, suscipit mollitia recusandae quidem blanditiis', '["image-32.jpg","image-45.jpg","image-33.jpg","image-34.jpg","image-35.jpg"]'),
(2,'Redoblante','Redoblante Roadshow 14x6,5 8 Torres Rsn1465s',68800,30,1,'','Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nobis eveniet harum non, suscipit mollitia recusandae quidem blanditiis','Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nobis eveniet harum non, suscipit mollitia recusandae quidem blanditiis','["image-46.jpg","image-46.jpg","image-46.jpg","image-46.jpg","image-46.jpg"]'),
(3,'Pedal de bombo','Pedal de Bombo Hebikuo G610 Cadena Doble base metalica',20000,60,1,'','Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nobis eveniet harum non, suscipit mollitia recusandae quidem blanditiis','Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nobis eveniet harum non, suscipit mollitia recusandae quidem blanditiis','["image-47.jpg","image-47.jpg","image-47.jpg","image-47.jpg","image-47.jpg"]'),
(4,'Bombo de Bateria','Bombo de Bateria Pearl Forum Fzh2218b/c 22x18',100000,50,1,'','Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nobis eveniet harum non, suscipit mollitia recusandae quidem blanditiis','Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nobis eveniet harum non, suscipit mollitia recusandae quidem blanditiis','["image-48.jpg","image-48.jpg","image-48.jpg","image-48.jpg","image-48.jpg"]'),
(5,'Set de Platillos','Set de platillos Zildjian Zp1418 Hi Hat 14 Cash 18 Palillos',25000,30,1,'','Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nobis eveniet harum non, suscipit mollitia recusandae quidem blanditiis','Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nobis eveniet harum non, suscipit mollitia recusandae quidem blanditiis','["image-49.jpg","image-49.jpg","image-49.jpg","image-49.jpg","image-49.jpg"]'),
(6,'Batería Acústica','Batería Acústica 5 cuerpos 20 14 12 10 Yamaha Rydeen Rdp0f5',450000,20,1,'', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nobis eveniet harum non, suscipit mollitia recusandae quidem blanditiis','Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nobis eveniet harum non, suscipit mollitia recusandae quidem blanditiis', '["image-32.jpg","image-45.jpg","image-33.jpg","image-34.jpg","image-35.jpg"]'),
(7,'Redoblante','Redoblante Roadshow 14x6,5 8 Torres Rsn1465s',78800,30,1,'','Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nobis eveniet harum non, suscipit mollitia recusandae quidem blanditiis','Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nobis eveniet harum non, suscipit mollitia recusandae quidem blanditiis','["image-46.jpg","image-46.jpg","image-46.jpg","image-46.jpg","image-46.jpg"]'),
(8,'Pedal de bombo','Pedal de Bombo Hebikuo G610 Cadena Doble base metalica',26800,20,1,'','Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nobis eveniet harum non, suscipit mollitia recusandae quidem blanditiis','Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nobis eveniet harum non, suscipit mollitia recusandae quidem blanditiis','["image-47.jpg","image-47.jpg","image-47.jpg","image-47.jpg","image-47.jpg"]'),
(9,'Bombo de Bateria','Bombo de Bateria Pearl Forum Fzh2218b/c 22x18',456000,50,1,'','Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nobis eveniet harum non, suscipit mollitia recusandae quidem blanditiis','Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nobis eveniet harum non, suscipit mollitia recusandae quidem blanditiis','["image-48.jpg","image-48.jpg","image-48.jpg","image-48.jpg","image-48.jpg"]'),
(10,'Set de Platillos','Set de platillos Zildjian Zp1418 Hi Hat 14 Cash 18 Palillos',25800,30,1,'','Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nobis eveniet harum non, suscipit mollitia recusandae quidem blanditiis','Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nobis eveniet harum non, suscipit mollitia recusandae quidem blanditiis','["image-49.jpg","image-49.jpg","image-49.jpg","image-49.jpg","image-49.jpg"]'),