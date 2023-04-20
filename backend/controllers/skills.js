const pool = require("../models/db");

const createSkills = (req, res) => {
  const { skillName } = req.body;

  const query = `INSERT INTO skills (skillName) VALUES ($1) RETURNING *`;
  const data = [skillName];
  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Skill created successfully",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server error`,
        err: err,
      });
    });
};

const getAllSkills = (req, res) => {
    pool.query('SELECT * FROM skills', (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          success: false,
          message: 'Server error'
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'Retrieved all skills successfully',
          skills: result.rows
        });
      }
    });
  };


const addSkillForUser = (req, res) => {
  const userId=req.params.userId
  const { skill_id } = req.body;
  const query = `INSERT INTO user_skills (user_id, skill_id) VALUES ($1, $2) RETURNING *`;
  const data = [ userId,skill_id];
  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Skill added successfully for user ${userId}`,
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server error`,
        err: err,
      });
    });
};




  const getAllSkillsForUser = (req, res) => {
    const userId = req.params.userId;
    const query = `
      SELECT users.firstName, skills.skillName, projects.title AS projectName, jobOffer.jobOfferDescription
      FROM user_skills 
      INNER JOIN skills ON skills.id = user_skills.skill_id 
      INNER JOIN users ON users.id = user_skills.user_id 
      LEFT JOIN projects ON projects.user_id = users.id 
      LEFT JOIN jobOffer ON jobOffer.user_id = users.id 
      WHERE user_skills.user_id = $1
    `;
    const data = [userId];
    pool
      .query(query, data)
      .then((result) => {
        res.status(200).json({
          success: true,
          message: `Skills, projects, and job offers retrieved successfully for user ${userId}`,
          result: result.rows,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: `Server error`,
          err: err,
        });
      });
  };

  const softDeleteSkillForUser = (req, res) => {
    const userId = req.params.userId;
    const skillId = req.params.skillId;
    const query = `
      UPDATE user_skills
      SET is_deleted = 1
      WHERE user_id = $1 AND skill_id = $2
      RETURNING *
    `;
    const data = [userId, skillId];
    pool
      .query(query, data)
      .then((result) => {
        if (result.rows.length > 0) {
          res.status(200).json({
            success: true,
            message: `Skill ${skillId} has been soft deleted for user ${userId}`,
            result: result.rows[0],
          });
        } else {
          res.status(404).json({
            success: false,
            message: `Skill ${skillId} not found for user ${userId}`,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: `Server error`,
          err: err,
        });
      });
  };
  

module.exports = {
  createSkills,getAllSkills,getAllSkillsForUser,addSkillForUser,softDeleteSkillForUser
};
