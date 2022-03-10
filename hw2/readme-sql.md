## Instructions

**1. Create a new database in phpMyAdmin called music-db.**

**2. Please run the below SQL queries under music-db, one table at a time, in order. So you would run the Users code, then Artists, then Ratings**

## Users Table

CREATE TABLE users(
    username VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255)
);

INSERT INTO users (username, password)
	VALUES ("Amelia-Earhart", "Youaom139&yu7");
    
INSERT INTO users (username, password)
	VALUES ("Otto", "StarWars2*");

## Artists Table

CREATE TABLE artists (song VARCHAR(255) PRIMARY KEY,
                      artist VARCHAR(255));

INSERT INTO artists (song, artist)
    VALUES ("Freeway", "Aimee Mann");

INSERT INTO artists (song, artist)
    VALUES ("Days of Wine and Roses", "Bill Evans");

INSERT INTO artists (song, artist)
    VALUES ("These Walls", "Kendrick Lamar");

## Ratings Table

CREATE TABLE ratings (id INTEGER(1) PRIMARY KEY AUTO_INCREMENT,
                      username VARCHAR(255),
                      song VARCHAR(255),
                      rating INTEGER(1));


INSERT INTO ratings (username, song, rating)
	VALUES ("Amelia-Earhart", "Freeway", 3);
    
INSERT INTO ratings (username, song, rating)
	VALUES ("Amelia-Earhart", "Days of Wine and Roses", 4);
    
INSERT INTO ratings (username, song, rating)
	VALUES ("Otto", "Days of Wine and Roses", 5);
    
INSERT INTO ratings (username, song, rating)
	VALUES ("Amelia-Earhart", "These Walls", 4);

ALTER TABLE `ratings` ADD INDEX(`username`);

ALTER TABLE `ratings` ADD FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE CASCADE ON UPDATE RESTRICT;

ALTER TABLE `ratings` ADD INDEX(`song`);

ALTER TABLE `ratings` ADD FOREIGN KEY (`song`) REFERENCES `artists`(`song`) ON DELETE CASCADE ON UPDATE RESTRICT;

