CREATE TABLE IF NOT EXISTS Faculty(
    facid INT(10) AUTO_INCREMENT NOT NULL,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (facid)
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Departments(
    facid INT(10) NOT NULL,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (facid, name),
    FOREIGN KEY (facid) REFERENCES Faculty(facid) ON DELETE NO ACTION
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Faculty_Members(
    facid INT(10) NOT NULL,
    dname VARCHAR(50) NOT NULL,
    memid INT(10) NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (memid),
    FOREIGN KEY (facid, dname) REFERENCES Departments(facid, name) ON DELETE NO ACTION
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Instructors(
    memid INT(10) NOT NULL,
    PRIMARY KEY (memid),
    FOREIGN KEY (memid) REFERENCES Faculty_Members(memid) ON DELETE CASCADE
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Advisors(
    memid INT(10) NOT NULL,
    PRIMARY KEY (memid),
    FOREIGN KEY (memid) REFERENCES Faculty_Members(memid) ON DELETE CASCADE
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Curricula(
    curid INT(10) NOT NULL AUTO_INCREMENT,
    facid INT(10) NOT NULL,
    dname VARCHAR(50) NOT NULL,
    semester_system_type CHAR(1) NOT NULL,
    PRIMARY KEY (curid),
    FOREIGN KEY (facid, dname) REFERENCES Departments(facid, name) ON DELETE NO ACTION
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Courses(
    cid INT(10) NOT NULL AUTO_INCREMENT,
    course_no VARCHAR(10) NOT NULL,
    name VARCHAR(50) NOT NULL,
    credit INT(1) NOT NULL,
    description VARCHAR(255),
    type CHAR(1) NOT NULL,
    PRIMARY KEY (cid)
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Requires(
    requirer_cid INT(10) NOT NULL,
    required_cid INT(10) NOT NULL,
    PRIMARY KEY (requirer_cid, required_cid),
    FOREIGN KEY (requirer_cid) REFERENCES Courses(cid) ON DELETE CASCADE,
    FOREIGN KEY (required_cid) REFERENCES Courses(cid) ON DELETE CASCADE
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Is_In(
    curid INT(10) NOT NULL,
    cid INT(10) NOT NULL,
    PRIMARY KEY (curid, cid),
    FOREIGN KEY (curid) REFERENCES Curricula(curid) ON DELETE CASCADE,
    FOREIGN KEY (cid) REFERENCES Courses(cid) ON DELETE CASCADE
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Sections(
    cid INT(10) NOT NULL,
    semester CHAR(1) NOT NULL,
    year INT(4) NOT NULL,
    sec_no INT(3) NOT NULL,
    memid INT(10),
    capacity INT(3) NOT NULL,
    PRIMARY KEY (cid, semester, year, sec_no),
    FOREIGN KEY (cid) REFERENCES Courses(cid) ON DELETE CASCADE,
    FOREIGN KEY (memid) REFERENCES Instructors(memid) ON DELETE SET NULL
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Zipcode(
    zipcode VARCHAR(10) NOT NULL,
    country VARCHAR(20) NOT NULL,
    province VARCHAR(20) NOT NULL,
    PRIMARY KEY (zipcode, country)
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Students(
    sid INT(10) NOT NULL AUTO_INCREMENT,
    student_id CHAR(10) NOT NULL,
    curid INT(10) NOT NULL,
    memid INT(10),
    title VARCHAR(20) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(30),
    nationality VARCHAR(30),
    birthdate DATE,
    gender VARCHAR(10) NOT NULL,
    citizen_id VARCHAR(15) NOT NULL,
    religion VARCHAR(20),
    mobile VARCHAR(15),
    img VARCHAR(40),
    addr VARCHAR(50),
    zipcode VARCHAR(10),
    country VARCHAR(20),
    emer_name VARCHAR(20),
    emer_mobile VARCHAR(15),
    emer_addr VARCHAR(50),
    emer_zipcode VARCHAR(10),
    emer_country VARCHAR(20),
    highschool_name VARCHAR(50),
    highschool_grade VARCHAR(5),
    gpax REAL,
    semester_count INT(2) NOT NULL,
    summer_count INT(2) NOT NULL,
    status CHAR(1) NOT NULL,
    behavioral_score INT(3) NOT NULL,
    PRIMARY KEY (sid),
    FOREIGN KEY (curid) REFERENCES Curricula(curid) ON DELETE NO ACTION,
    FOREIGN KEY (memid) REFERENCES Advisors(memid) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Enrollment_Records(
    sid INT(10) NOT NULL,
    cid INT(10) NOT NULL,
    semester CHAR(1) NOT NULL,
    year INT(4) NOT NULL,
    sec_no INT(3) NOT NULL,
    grade VARCHAR(2) NOT NULL,
    status CHAR(1),
    PRIMARY KEY (sid, cid, semester, year, sec_no),
    FOREIGN KEY (sid) REFERENCES Students(sid) ON DELETE NO ACTION,
    FOREIGN KEY (cid, semester, year, sec_no) REFERENCES Sections(cid, semester, year, sec_no) ON DELETE NO ACTION
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Grades(
    sid INT(10) NOT NULL,
    semester CHAR(1) NOT NULL,
    year INT(4) NOT NULL,
    gpa REAL,
    gpax REAL,
    PRIMARY KEY (sid, semester, year),
    FOREIGN KEY (sid) REFERENCES Students(sid) ON DELETE NO ACTION
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Leaves(
    sid INT(10) NOT NULL,
    semester CHAR(1) NOT NULL,
    year INT(4) NOT NULL,
    type CHAR(1) NOT NULL,
    description VARCHAR(255),
    PRIMARY KEY (sid, semester, year),
    FOREIGN KEY (sid) REFERENCES Students(sid) ON DELETE NO ACTION
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Projects(
    prjid INT(10) NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    PRIMARY KEY (prjid)
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Does_Projects(
    prjid INT(10) NOT NULL,
    sid INT(10) NOT NULL,
    PRIMARY KEY (prjid, sid),
    FOREIGN KEY (prjid) REFERENCES Projects(prjid) ON DELETE CASCADE,
    FOREIGN KEY (sid) REFERENCES Students(sid) ON DELETE NO ACTION
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Advises_Senior(
    prjid INT(10) NOT NULL,
    memid INT(10) NOT NULL,
    sid INT(10) NOT NULL,
    PRIMARY KEY (prjid, memid, sid),
    FOREIGN KEY (prjid) REFERENCES Projects(prjid) ON DELETE CASCADE,
    FOREIGN KEY (memid) REFERENCES Advisors(memid) ON DELETE CASCADE,
    FOREIGN KEY (sid) REFERENCES Students(sid) ON DELETE NO ACTION
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Competition_Teams(
    tid INT(10) NOT NULL AUTO_INCREMENT,
    name VARCHAR(50),
    PRIMARY KEY (tid)
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Teams_Up_With(
    sid INT(10) NOT NULL,
    tid INT(10) NOT NULL,
    PRIMARY KEY (sid, tid),
    FOREIGN KEY (sid) REFERENCES Students(sid) ON DELETE NO ACTION,
    FOREIGN KEY (tid) REFERENCES Competition_Teams(tid) ON DELETE CASCADE
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Consults_Team(
    memid INT(10) NOT NULL,
    tid INT(10) NOT NULL,
    PRIMARY KEY (memid, tid),
    FOREIGN KEY (memid) REFERENCES Advisors(memid) ON DELETE CASCADE,
    FOREIGN KEY (tid) REFERENCES Competition_Teams(tid) ON DELETE CASCADE
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Competitions(
    tid INT(10) NOT NULL,
    competition_name VARCHAR(50) NOT NULL,
    prize VARCHAR(255) NOT NULL,
    competition_description VARCHAR(255), 
    PRIMARY KEY (tid, competition_name, prize),
    FOREIGN KEY (tid) REFERENCES Competition_Teams(tid) ON DELETE NO ACTION
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Activities(
    aid INT(10) NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    max_score INT(3) NOT NULL,
    description VARCHAR(255),
    PRIMARY KEY (aid)
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Does(
    aid INT(10) NOT NULL,
    sid INT(10) NOT NULL,
    received_score INT(3) NOT NULL,
    PRIMARY KEY (aid, sid),
    FOREIGN KEY (aid) REFERENCES Activities(aid) ON DELETE CASCADE,
    FOREIGN KEY (sid) REFERENCES Students(sid) ON DELETE NO ACTION
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Punishment_Criteria(
    pid INT(10) NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    score_deduction INT(3) NOT NULL,
    description VARCHAR(255),
    PRIMARY KEY (pid)
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Punishment_Records(
    sid INT(10) NOT NULL,
    pid INT(10) NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    PRIMARY KEY (sid, pid, timestamp),
    FOREIGN KEY (sid) REFERENCES Students(sid) ON DELETE NO ACTION,
    FOREIGN KEY (pid) REFERENCES Punishment_Criteria(pid) ON DELETE NO ACTION
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Semesters_Period(
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    semester CHAR(1) NOT NULL,
    year INT(4) NOT NULL,
    PRIMARY KEY (start_time, end_time)
) DEFAULT CHARACTER SET = utf8;