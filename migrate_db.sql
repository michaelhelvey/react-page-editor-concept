drop database if exists editor_test;

create database editor_test;

use editor_test;

CREATE TABLE pages
(
  id int NOT NULL
  AUTO_INCREMENT,
  title varchar
  (255),
  slug varchar
  (255),
  page_data json,
  PRIMARY KEY
  (ID)
);