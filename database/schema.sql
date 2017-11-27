DROP DATABASE IF EXISTS impulse;

CREATE DATABASE impulse;

USE impulse;

CREATE TABLE Users (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username varchar(40) UNIQUE NOT NULL,
  password varchar(64) NOT NULL,
  salt varchar(64) NOT NULL
);
CREATE TABLE Sessions (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  cookieId varchar(64),
  userId INT,
  FOREIGN KEY (userId) REFERENCES Users(id)
);
CREATE TABLE Photos (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  userId INT,
  url varchar(400),
  thumbnail varchar(400),
  author varchar(60),
  shared_count integer,
  category varchar(64),
  CONSTRAINT uniquePhotoPerUser UNIQUE (userId, url),
  FOREIGN KEY (userId) REFERENCES Users(id)
);

CREATE TABLE Favorites (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  userId integer NOT NULL,
  photoId integer NOT NULL,
  FOREIGN KEY (userId) REFERENCES Users(id),
  FOREIGN KEY (photoId) REFERENCES Photos(id)
);



--
-- //RUN THIS COMMAND TO RUN THIS FILE  mysql -u root < server/schema.sql
