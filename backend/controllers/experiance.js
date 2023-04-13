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

module.exports = { getExperiance};