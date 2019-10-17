var mysql = require('mysql');

var conZero = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "gvt123",
});

const user = "CREATE TABLE user (id varchar(36),  title varchar(40),  age int,  ph varchar(40),  email varchar(40),  creditcard varchar(40),  PRIMARY KEY (id))";
const country = "CREATE TABLE country (id varchar(36),  title varchar(40),  x int,  y int,  PRIMARY KEY (id))";
const city = "CREATE TABLE city (id varchar(36),  title varchar(40),  x int,  y int,  countryId varchar(36),  PRIMARY KEY (id))";
const mall = "CREATE TABLE mall (id varchar(36),  title varchar(40),  x int,  y int,  cityId varchar(36),  PRIMARY KEY (id))";
const credit = "CREATE TABLE credit (id varchar(36),  title varchar(40),  value int,  sellingPrice int,  validity varchar(36),  type varchar(36),  mallId varchar(36),  userId varchar(36),  PRIMARY KEY (id))";

const friend = "CREATE TABLE friend (id int AUTO_INCREMENT,  userId1 varchar(40),  userId2 varchar(40),  PRIMARY KEY (id))";

conZero.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  conZero.query("DROP DATABASE credits", function (err, result) {
    if (err) throw err;
    console.log("Database dropped");
  });
  conZero.query("CREATE DATABASE credits", function (err, result) {
    if (err) throw err;
    console.log("Database created");

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "gvt123",
      database: "credits",
    });

    con.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
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
      con.query(friend, function (err, result) {
        if (err) throw err;
        console.log("Table created");
      });
    });
  });
});
