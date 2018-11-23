drop database if exists editor_test;

create database editor_test;

use editor_test;

CREATE TABLE pages
(
  id int NOT NULL
  AUTO_INCREMENT,
  title varchar
  (255),
  path varchar
  (255),
  page_data LONGTEXT,
  PRIMARY KEY
  (ID)
);

INSERT INTO pages values (1, "Home Page", "/", "W10=");

INSERT INTO pages values (2, "About Page", "about", "W10=");