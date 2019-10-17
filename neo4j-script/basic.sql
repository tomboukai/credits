CREATE DATABASE credits;

CREATE TABLE user (
    id varchar(36),
    title varchar(40),
    age int,
    ph varchar(40),
    email varchar(40),
    creditcard varchar(40),
    PRIMARY KEY (ID)
);

CREATE TABLE country (
    id varchar(36),
    title varchar(40),
    x int,
    y int,
    PRIMARY KEY (ID)
);

CREATE TABLE city (
    id varchar(36),
    title varchar(40),
    x int,
    y int,
    countryId varchar(36),
    PRIMARY KEY (ID)
);

CREATE TABLE mall (
    id varchar(36),
    title varchar(40),
    x int,
    y int,
    cityId varchar(36),
    PRIMARY KEY (ID)
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
    PRIMARY KEY (ID)
);
