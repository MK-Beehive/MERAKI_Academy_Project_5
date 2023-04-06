//information user querys
INSERT INTO roles (role) VALUES ('user') RETURNING *
INSERT INTO majority (majorityName) VALUES ('engineering') RETURNING *
INSERT INTO users (firstName , lastName , email ,  password ,  role_id ) VALUES ('sahar', 'alomari', 'sahar@gmail.com','123',1) RETURNING *;
INSERT INTO skills (skillName) VALUES
('Programming'),
('Data Analysis'),
('Project Management'),
('Leadership');
INSERT INTO status (statusName) VALUES ('open')
INSERT INTO projects (title , projectDescription , projectPrice ,  timeExpected , status_id  , majority_id,user_id ) VALUES ('project1', 'project1Des', 1000,30,1,1,1) RETURNING *;
INSERT INTO freelancerProjects (freelancerProjectStatus_id, project_id, user_id) VALUES (1, 1, 1) RETURNING *;
INSERT INTO information (informationDescription,jobTitle,image,cv,user_id,majority_id) VALUES ('HELLOE my name is ebetehal', 'mechatronics engineer','https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGljfGVufDB8fDB8fA%3D%3D&w=1000&q=80', 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGljfGVufDB8fDB8fA%3D%3D&w=1000&q=80',1,1) RETURNING *;
INSERT INTO jobOffer (budget , workday , jobOfferStatus_id ,  jobOfferDescription , project_id  ,user_id ) VALUES (1000,30,1, 'offer1Des',1,1) RETURNING *;
INSERT INTO user_skills (user_id, skill_id) VALUES (1, 1) RETURNING *;