CREATE TABLE Faculty(
    facid INT(10) AUTO_INCREMENT NOT NULL,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (facid)
);

CREATE TABLE Departments(
    facid INT(10) NOT NULL,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (facid, name),
    FOREIGN KEY (facid)
        REFERENCES Faculty(facid)
        ON DELETE CASCADE
);