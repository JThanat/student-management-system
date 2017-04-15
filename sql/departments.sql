CREATE TABLE Departments(
    facid INT(10) NOT NULL,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (facid, name),
    FOREIGN KEY (facid)
        REFERENCES Faculty(facid)
        ON DELETE CASCADE
);

INSERT INTO Departments(facid, name) 
    VALUES (1, 'Computer Engineering');

SELECT * FROM Departments