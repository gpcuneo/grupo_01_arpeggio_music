create table carts
(
    id        int auto_increment
        primary key,
    userid    char(36) not null,
    productid int      not null,
    quantity  int      not null,
    createdAt datetime not null,
    updatedAt datetime not null,
    constraint carts_ibfk_1
        foreign key (userid) references users (id),
    constraint carts_ibfk_2
        foreign key (productid) references products (id)
);

create index productid
    on carts (productid);

create index userid
    on carts (userid);