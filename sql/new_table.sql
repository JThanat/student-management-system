CREATE TABLE IF NOT EXISTS Faculties(
    faculty_id INT(10) NOT NULL,
    faculty_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (faculty_id)
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Departments(
    faculty_id INT(10) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (faculty_id, department_name),
    FOREIGN KEY (faculty_id) REFERENCES Faculties(faculty_id) 
        ON DELETE NO ACTION
        ON UPDATE CASCADE
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Faculty_Members(
    faculty_id INT(10) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    member_id INT(10) NOT NULL AUTO_INCREMENT,
    member_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (member_id),
    FOREIGN KEY (faculty_id, department_name) REFERENCES Departments(faculty_id, department_name) 
        ON DELETE NO ACTION
        ON UPDATE CASCADE
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Instructors(
    member_id INT(10) NOT NULL,
    PRIMARY KEY (member_id),
    FOREIGN KEY (member_id) REFERENCES Faculty_Members(member_id) 
        ON DELETE CASCADE
        ON UPDATE CASCADE
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Advisors(
    member_id INT(10) NOT NULL,
    PRIMARY KEY (member_id),
    FOREIGN KEY (member_id) REFERENCES Faculty_Members(member_id) 
        ON DELETE CASCADE
        ON UPDATE CASCADE
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Curricula(
    curriculum_id INT(10) NOT NULL AUTO_INCREMENT,
    faculty_id INT(10) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    semester_system_type CHAR(1) NOT NULL,
    PRIMARY KEY (curriculum_id),
    FOREIGN KEY (faculty_id, department_name) REFERENCES Departments(faculty_id, department_name) 
        ON DELETE NO ACTION
        ON UPDATE NO ACTION  
        # Should create new curricula instead
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Courses(
    course_id INT(10) NOT NULL AUTO_INCREMENT,
    course_no VARCHAR(10) NOT NULL,
    course_name VARCHAR(50) NOT NULL,
    credit INT(1) NOT NULL,
    course_description VARCHAR(255),
    course_type CHAR(1) NOT NULL,
    PRIMARY KEY (course_id)
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Required_Courses(
    requirer_course_id INT(10) NOT NULL,
    required_course_id INT(10) NOT NULL,
    PRIMARY KEY (requirer_course_id, required_course_id),
    FOREIGN KEY (requirer_course_id) REFERENCES Courses(course_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    FOREIGN KEY (required_course_id) REFERENCES Courses(course_id) 
        ON DELETE CASCADE
        ON UPDATE CASCADE
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Courses_Curricula(
    curriculum_id INT(10) NOT NULL,
    course_id INT(10) NOT NULL,
    PRIMARY KEY (curriculum_id, course_id),
    FOREIGN KEY (curriculum_id) REFERENCES Curricula(curriculum_id) 
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (course_id) REFERENCES Courses(course_id) 
        ON DELETE CASCADE
        ON UPDATE CASCADE
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Sections(
    course_id INT(10) NOT NULL,
    semester CHAR(1) NOT NULL,
    year INT(4) NOT NULL,
    section_no INT(3) NOT NULL,
    member_id INT(10),
    capacity INT(3) NOT NULL,
    PRIMARY KEY (course_id, semester, year, section_no),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id) 
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (member_id) REFERENCES Instructors(member_id) 
        ON DELETE SET NULL
        ON UPDATE CASCADE
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
    curriculum_id INT(10) NOT NULL,
    member_id INT(10),
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
    FOREIGN KEY (curriculum_id) REFERENCES Curricula(curriculum_id) 
        ON DELETE NO ACTION
        ON UPDATE CASCADE,
    FOREIGN KEY (member_id) REFERENCES Advisors(member_id) 
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Enrollment_Records(
    sid INT(10) NOT NULL,
    course_id INT(10) NOT NULL,
    semester CHAR(1) NOT NULL,
    year INT(4) NOT NULL,
    section_no INT(3) NOT NULL,
    grade VARCHAR(2) NOT NULL,
    status CHAR(1),
    PRIMARY KEY (sid, course_id, semester, year, section_no),
    FOREIGN KEY (sid) REFERENCES Students(sid) 
        ON DELETE NO ACTION
        ON UPDATE CASCADE,
    FOREIGN KEY (course_id, semester, year, section_no) REFERENCES Sections(course_id, semester, year, section_no) 
        ON DELETE NO ACTION
        ON UPDATE NO ACTION  # Should create new section instead
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Grades(
    sid INT(10) NOT NULL,
    semester CHAR(1) NOT NULL,
    year INT(4) NOT NULL,
    gpa REAL,
    gpax REAL,
    PRIMARY KEY (sid, semester, year),
    FOREIGN KEY (sid) REFERENCES Students(sid) 
        ON DELETE NO ACTION
        ON UPDATE CASCADE
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Leaves(
    sid INT(10) NOT NULL,
    semester CHAR(1) NOT NULL,
    year INT(4) NOT NULL,
    leave_type CHAR(1) NOT NULL,
    leave_description VARCHAR(255),
    PRIMARY KEY (sid, semester, year),
    FOREIGN KEY (sid) REFERENCES Students(sid) 
        ON DELETE NO ACTION
        ON UPDATE CASCADE
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Projects(
    project_id INT(10) NOT NULL AUTO_INCREMENT,
    project_name VARCHAR(50) NOT NULL,
    project_description VARCHAR(255),
    PRIMARY KEY (project_id)
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Does_Projects(
    project_id INT(10) NOT NULL,
    sid INT(10) NOT NULL,
    PRIMARY KEY (project_id, sid),
    FOREIGN KEY (project_id) REFERENCES Projects(project_id) 
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (sid) REFERENCES Students(sid) 
        ON DELETE NO ACTION
        ON UPDATE CASCADE
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Advises_Senior(
    project_id INT(10) NOT NULL,
    member_id INT(10) NOT NULL,
    sid INT(10) NOT NULL,
    PRIMARY KEY (project_id, member_id, sid),
    FOREIGN KEY (project_id) REFERENCES Projects(project_id) 
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (member_id) REFERENCES Advisors(member_id) 
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (sid) REFERENCES Students(sid) 
        ON DELETE NO ACTION
        ON UPDATE CASCADE
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Competition_Teams(
    team_id INT(10) NOT NULL AUTO_INCREMENT,
    team_name VARCHAR(50),
    PRIMARY KEY (team_id)
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Teams_Students(
    sid INT(10) NOT NULL,
    team_id INT(10) NOT NULL,
    PRIMARY KEY (sid, team_id),
    FOREIGN KEY (sid) REFERENCES Students(sid) 
        ON DELETE NO ACTION
        ON UPDATE CASCADE,
    FOREIGN KEY (team_id) REFERENCES Competition_Teams(team_id) 
        ON DELETE CASCADE
        ON UPDATE CASCADE
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Teams_Advisors(
    member_id INT(10) NOT NULL,
    team_id INT(10) NOT NULL,
    PRIMARY KEY (member_id, team_id),
    FOREIGN KEY (member_id) REFERENCES Advisors(member_id) 
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (team_id) REFERENCES Competition_Teams(team_id) 
        ON DELETE CASCADE
        ON UPDATE CASCADE
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Competitions(
    team_id INT(10) NOT NULL,
    competition_name VARCHAR(50) NOT NULL,
    prize VARCHAR(255) NOT NULL,
    competition_description VARCHAR(255), 
    PRIMARY KEY (team_id, competition_name, prize),
    FOREIGN KEY (team_id) REFERENCES Competition_Teams(team_id) 
        ON DELETE NO ACTION  # If team is deleted, we cannot track student's award.
        ON UPDATE CASCADE
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Activities(
    activity_id INT(10) NOT NULL AUTO_INCREMENT,
    activity_name VARCHAR(50) NOT NULL,
    max_score INT(3) NOT NULL,
    activity_description VARCHAR(255),
    PRIMARY KEY (activity_id)
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Does(
    activity_id INT(10) NOT NULL,
    sid INT(10) NOT NULL,
    received_score INT(3) NOT NULL,
    PRIMARY KEY (activity_id, sid),
    FOREIGN KEY (activity_id) REFERENCES Activities(activity_id) 
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (sid) REFERENCES Students(sid) 
        ON DELETE NO ACTION
        ON UPDATE CASCADE
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Punishment_Criteria(
    punishment_id INT(10) NOT NULL AUTO_INCREMENT,
    punishment_name VARCHAR(50) NOT NULL,
    score_deduction INT(3) NOT NULL,
    punishment_description VARCHAR(255),
    PRIMARY KEY (punishment_id)
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Punishment_Records(
    sid INT(10) NOT NULL,
    punishment_id INT(10) NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    PRIMARY KEY (sid, punishment_id, timestamp),
    FOREIGN KEY (sid) REFERENCES Students(sid) 
        ON DELETE NO ACTION
        ON UPDATE CASCADE,
    FOREIGN KEY (punishment_id) REFERENCES Punishment_Criteria(punishment_id) 
        ON DELETE NO ACTION
        ON UPDATE NO ACTION  # Should create new criteria instead
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Semesters_Period(
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    semester CHAR(1) NOT NULL,
    year INT(4) NOT NULL,
    PRIMARY KEY (start_time, end_time)
) DEFAULT CHARACTER SET = utf8;