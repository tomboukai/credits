var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "gvt123",
});

const user = "CREATE TABLE user (id varchar(36),  title varchar(40),  age int,  ph varchar(40),  email varchar(40),  creditcard varchar(40),  PRIMARY KEY (ID))";

const country = "CREATE TABLE country (id varchar(36),  title varchar(40),  x int,  y int,  PRIMARY KEY (ID))";

const city = "CREATE TABLE city (id varchar(36),  title varchar(40),  x int,  y int,  countryId varchar(36),  PRIMARY KEY (ID))";

const mall = "CREATE TABLE mall (id varchar(36),  title varchar(40),  x int,  y int,  cityId varchar(36),  PRIMARY KEY (ID))";

const credit = "CREATE TABLE credit (id varchar(36),  title varchar(40),  value int,  sellingPrice int,  validity varchar(36),  type varchar(36),  mallId varchar(36),  userId varchar(36),  PRIMARY KEY (ID))";

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE credits", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
  con.query(user, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
  con.query(country, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
  con.query(city, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
  con.query(mall, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
  con.query(credit, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
