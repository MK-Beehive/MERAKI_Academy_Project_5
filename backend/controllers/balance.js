const pool = require("../models/db");

const getAllBalances = async (req, res) => {
  try {
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
//=============sahar ==================
const updatebalancestatus = (req, res) => {
  const project_id = req.params.id;
  const { status_id } = req.body;
  console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOO",status_id , project_id)
  pool
    .query(
      `UPDATE balance SET status_id=${status_id} WHERE project_id =${project_id} RETURNING *;`
    )
    .then((result) => {
      res
        .json({
          success: true,
          message: "balance updated successfully",
          balance: result.rows,
        })
        .status(200);
    })
    .catch((err) => {
      res
        .json({ success: false, massage: "Server error", err: err })
        .status(500);
    });
};

const creatbalance = (req, res) => {


console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", req.body)
  const {
    initialBalance,
    ourBalance,
    FreeLancerBalance,
    freelancerUser,
    clientUser,
    status_id,
    project_id,
  } = req.body;

  const placeholder = [
    initialBalance,
    ourBalance,
    FreeLancerBalance,
    freelancerUser,
    clientUser,
    status_id,
    project_id,
  ];
  pool
    .query(
      `INSERT INTO balance ( initialBalance , ourBalance ,FreeLancerBalance ,freelancerUser ,
          clientUser , status_id ,project_id )VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *;`,
      placeholder
    )
    .then((result) => {
console.log("XXXXXXXXXXXXXXXXXXXXresultXXXXXXXXXXXXXXXXXXXXX", result.rows)

      res
        .json({
          success: true,
          massage: "add balance successfully",
          balance: result.rows,
        })
        .status(201);
    })
    .catch((err) => {
      console.log(err);
      res
        .json({ success: false, massage: "Server error", err: err })
        .status(500);
    });
};

module.exports = {
  getAllBalances,
  getBalanceForUser,
  updatebalancestatus,
  creatbalance
};
