CREATE DATABASE credits;

CREATE TABLE user (
    id varchar(36),
    title varchar(40),
    age int,
    ph varchar(40),
    email varchar(40),
    creditcard varchar(40),
    PRIMARY KEY (id)
);

CREATE TABLE friend (
    id int AUTO_INCREMENT,
    userId1 varchar(40),
    userId2 varchar(40),
    PRIMARY KEY (id)
);

CREATE TABLE country (
    id varchar(36),
    title varchar(40),
    x int,
    y int,
    PRIMARY KEY (id)
);

CREATE TABLE city (
    id varchar(36),
    title varchar(40),
    x int,
    y int,
    countryId varchar(36),
    PRIMARY KEY (id)
);

CREATE TABLE mall (
    id varchar(36),
    title varchar(40),
    x int,
    y int,
    cityId varchar(36),
    PRIMARY KEY (id)
);

CREATE TABLE credit (
    id varchar(36),
    title varchar(40),
    value int,
    sellingPrice int,
    validity varchar(36),
    type varchar(36),
    mallId varchar(36),
    userId varchar(36),
    PRIMARY KEY (id)
);
