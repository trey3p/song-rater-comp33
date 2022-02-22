
Users Table

CREATE TABLE users(
    username VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255)
);

INSERT INTO users (username, password)
	VALUES ("Amelia-Earhart", "Youaom139&yu7");
    
INSERT INTO users (username, password)
	VALUES ("Otto", "StarWars2*");

Ratings Table

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

ALTER TABLE `ratings` ADD FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE CASCADE ON UPDATE RESTRICT

Artists Table

CREATE TABLE artists (song VARCHAR(255) PRIMARY KEY,
                      artist VARCHAR(255));