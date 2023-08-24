DROP TABLE IF EXISTS `shippings`;
CREATE TABLE IF NOT EXISTS `shippings`(
    `id` INT AUTO_INCREMENT NOT NULL,
    `status` VARCHAR(200) NOT NULL,
    `order_id` INT NOT NULL,
    `createdAt` DateTime NOT NULL,
    `updatedAt` DateTime NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;