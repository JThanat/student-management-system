CREATE TABLE Faculty(
    facid INT(10) AUTO_INCREMENT NOT NULL,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (facid)
);

INSERT INTO Faculty(
    name
) VALUES (
    'Faculty of Engineering'
);

SELECT * FROM Faculty