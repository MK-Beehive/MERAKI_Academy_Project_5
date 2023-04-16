const pool = require('../models/db');

// const createMajors = (req, res) => {
//   const { majorityName } = req.body;

//   const query = `INSERT INTO majority (majorityName) VALUES ($1) RETURNING *`;
//   const data = [majorityName];

//   pool.query(query, data, (error, result) => {
//     if (error) {
//       console.error(error);
//       res.status(500).json({
//         success: false,
//         message: 'Server error',
//         error: error,
//       });
//     } else {
//       res.status(201).json({
//         success: true,
//         message: 'Major created successfully',
//         result: result.rows,
//       });
//     }
//   });
// };

const getExperiance = (req, res) => {
  const query = 'SELECT * FROM experiance';

  pool.query(query, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error,
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Retrieved all experiance successfully',
        experiances: result.rows,
      });
    }
  });
};
const getExperianceForUser = (req, res) => {
  const userId = req.params.uid;
  console.log(2);
  console.log(req.params);

  const query = `SELECT experiancename
  FROM information 
  JOIN experiance  ON information.experiance_id = experiance.id
  WHERE information.user_id = $1`;
  pool
    .query(query,[userId])
    .then((result) => {
      res
        .json({
          success: true,
          massage: "GET all experiances successfully",
          result: result.rows,
        })
        .status(200);
    })
    .catch((err) => {
      console.log(err);
      res
        .json({ success: false, massage: "Server error", err: err })
        .status(500);
    });
};
/*
const getExperianceForUser = (req, res) => {
  const user_id = req.params.id;
  const query = `
    SELECT e.experiancename
    FROM information i
    JOIN experiance e ON i.experiance_id = e.id
    WHERE i.user_id = $1`;

  pool.query(query, [user_id], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error,
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Retrieved experiance for user successfully',
        experiances: result.rows,
      });
      console.log(user_id);
    }
  });
};
*/
module.exports = { getExperiance,getExperianceForUser};