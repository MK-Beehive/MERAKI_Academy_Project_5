const pool = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.SALT);


const register = async (req, res) => {
  const { firstName, lastName, email, password, role_id } = req.body;

  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  const query = `INSERT INTO users (firstName, lastName,email,password,role_id) VALUES ($1,$2,$3,$4,$5) RETURNING *`;
  const data = [
    firstName,
    lastName,
    email.toLowerCase(),
    encryptedPassword,
    role_id,
  ];
  pool.query(query, data)
    .then((result) => {
      const { id, role_id } = result.rows[0];
      const payload = {
        userId: id,
        role: role_id,
      };
      const options = { expiresIn: "24h" };
      const secret = process.env.SECRET;
      const token = jwt.sign(payload, secret, options);
      if (token) {
        res.status(200).json({
          success: true,
          message: "Account created and user logged in",
          token,
          userId: id
        });
      } else {
        throw Error;
      }
    })
    .catch((error) => {
      res.status(409).json({ success: false, message: "This email already exists", error: error })
    });
};

const login = (req, res) => {
    const password = req.body.password;
    const email = req.body.email;
    const query = `SELECT * FROM users WHERE email = $1 AND is_deleted = 0`;
    const data = [email.toLowerCase()];
    pool
      .query(query, data)
      .then((result) => {
        if (result.rows.length) {
          bcrypt.compare(password, result.rows[0].password, (err, response) => {
            if (err) res.json(err);
            if (response) {
              const payload = {
                userId: result.rows[0].id,
                role: result.rows[0].role_id,
              };
              const options = { expiresIn: "24h" };
              const secret = process.env.SECRET;
              const token = jwt.sign(payload, secret, options);
              if (token) {
                return res.status(200).json({
                  success: true,
                  message: `Valid login credentials`,
                  token,
                  userId:result.rows[0].id,
                  user: result.rows[0]
                });
              } else {
                throw Error;
              }
            } else {
              res.status(403).json({
                success: false,
                message: `The email doesn’t exist or the password you’ve entered is incorrect`,
              });
            }
          });
        } else throw Error;
      })
      .catch((err) => {
        res.status(403).json({
          success: false,
          message:
            "The email doesn’t exist or the password you’ve entered is incorrect",
          err,
        });
      });
  };

  const getAllUsers = async (req, res) => {
    try {
      const query = `SELECT * FROM users WHERE is_deleted = 0`;
      const result = await pool.query(query);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
const deleteUserById = async (req,res) => {
    try{
        const userId = req.params.id;
        const query = `UPDATE users SET is_deleted =1 WHERE id=$1 RETURNING *`
        const result = await pool.query(query,[userId]);
        if(result.rows.length){
            res.status(200).json({success: true, message:"User deleted successfully"})
        }
        else{
            res.status(404).json({success: false, message:"User not found"})
        }
    
    }
    catch(error){
        console.error(error)
        res.status(500).json({success: false, message:"Server error"})
}
}


const updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const { firstName, lastName, email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, saltRounds); // hash the new password
    const query = `UPDATE users 
    SET 
      firstName = COALESCE($1, firstName), 
      lastName = COALESCE($2, lastName), 
      email = COALESCE($3, email), 
      password = COALESCE($4, password) 
    WHERE id =$5 
    RETURNING *`;
    const data = [firstName, lastName, email, encryptedPassword, userId]; // use the hashed password
    const result = await pool.query(query, data);
    if (result.rows.length) {
      res.status(200).json({ user: result.rows[0], message: "User updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};





  module.exports = {
    register,
    login,
    getAllUsers,
    deleteUserById,
    updateUserById

  };
