const pool = require('../models/db');

const getAllBalances = async(req, res) => {
try{
  const query = `SELECT * FROM balance `;
  const result = await pool.query(query);

   res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
};

const getBalanceForUser = async (req, res) => {
    const userId = req.params.userId;
    console.log(userId);
    try {
      const query = `SELECT * FROM balance WHERE freelancerUser = $1 OR clientUser = $1`;
      const result = await pool.query(query, [userId]);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  module.exports = {
    getAllBalances,
    getBalanceForUser,
  };
  

