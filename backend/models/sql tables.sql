CREATE TABLE roles (
  id SERIAL NOT NULL,
  role VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE permissions (
  id SERIAL NOT NULL,
  permission VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role_permission (
  id SERIAL NOT NULL,
  role_id INT,
  permission_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (permission_id) REFERENCES permissions(id),
  PRIMARY KEY (id)
);

CREATE TABLE users(
  id SERIAL NOT NULL,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role_id INT NOT NULL,
  is_deleted SMALLINT DEFAULT 0,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  PRIMARY KEY (id)
);

CREATE TABLE information (
  id SERIAL NOT NULL,
  informationDescription TEXT DEFAULT 'No Description for The User',
  jobTitle VARCHAR(255) DEFAULT 'NO Job Title',
  image VARCHAR(255) DEFAULT 'https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg',
  cv VARCHAR(255) DEFAULT NULL,
  user_id INT UNIQUE,
  majority_id INT,
  experiance_id INT,
  is_deleted SMALLINT DEFAULT 0,
  rate NUMERIC,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (majority_id) REFERENCES majority(id),
  FOREIGN KEY (experiance_id) REFERENCES experiance (id),
  PRIMARY KEY (id)
);

CREATE TABLE majority(
  id SERIAL NOT NULL,
  majorityName VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE experiance(
  id SERIAL NOT NULL,
  experianceName VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE skills(
  id SERIAL NOT NULL,
  skillName VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE status(
  id SERIAL NOT NULL,
  statusName VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE projects (
  id SERIAL NOT NULL,
  title VARCHAR(255),
  projectDescription TEXT,
  cv TEXT,
  projectPrice INT,
  timeExpected INT,
  status_id INT NOT NULL,
  majority_id INT,
  user_id INT,
  is_deleted SMALLINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (majority_id) REFERENCES majority(id),
  FOREIGN KEY (status_id) REFERENCES status(id),
  PRIMARY KEY (id)
);

CREATE TABLE freelancerProjects (
  id SERIAL NOT NULL,
  freelancerProjectStatus_id INT NOT NULL,
  project_id INT,
  user_id INT,
  is_deleted SMALLINT DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (freelancerProjectStatus_id) REFERENCES status(id),
  PRIMARY KEY (id)
);

CREATE TABLE jobOffer (
  id SERIAL NOT NULL,
  budget INT,
  workday INT,
  jobOfferStatus_id INT NOT NULL,
  jobOfferDescription TEXT,
  project_id INT,
  user_id INT,
  is_deleted SMALLINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (jobOfferStatus_id) REFERENCES status(id),
  PRIMARY KEY (id)
);

CREATE TABLE user_skills (
  id SERIAL NOT NULL,
  user_id INT,
  skill_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (skill_id) REFERENCES skills(id),
  PRIMARY KEY (id)
) CREATE TABLE notification(
  id SERIAL NOT NULL,
  notificationMessage VARCHAR(255),
  user_id INT,
  project_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  PRIMARY KEY (id)
);

CREATE TABLE balance(
  id SERIAL NOT NULL,
  initialBalance NUMERIC,
  ourBalance NUMERIC,
  FreeLancerBalance NUMERIC,
  freelancerUser INT,
  clientUser INT,
  status_id INT,
  project_id INT,
  FOREIGN KEY (project_id) REFERENCES projects(id) ,
FOREIGN KEY (freelancerUser) REFERENCES users(id),
  FOREIGN KEY (clientUser) REFERENCES users(id),
  FOREIGN KEY (freelancerUser) REFERENCES users(id),
  FOREIGN KEY (status_id) REFERENCES status(id),
  PRIMARY KEY (id)
)

CREATE TABLE chat(
  id SERIAL NOT NULL,
  Messages VARCHAR(255),
  sender_id INT,
  room_id INT,
  created_at TIMESTAMP default now(),
  FOREIGN KEY (sender_id) REFERENCES users(id),
  PRIMARY KEY (id)
);

CREATE TABLE chatnotification(
  id SERIAL NOT NULL,
  chatnotification VARCHAR(255),
  imageuser VARCHAR(255),
  user_id INT,
  room_id INT, 
  sender_id INT, 
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (sender_id) REFERENCES users(id),
  PRIMARY KEY (id)
);


