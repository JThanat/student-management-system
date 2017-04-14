CREATE TABLE Faculty_Members(
    fid INT(10) NOT NULL,
    dname VARCHAR(50) NOT NULL,
    memid INT(10) NOT NULL,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (memid),
    FOREIGN KEY (fid)
        REFERENCES Department(facid)
        ON DELETE CASCADE
);

INSERT INTO Faculty_Members(facid, name) 
    VALUES (1, 'Computer Engineering');

SELECT * FROM Faculty_Members