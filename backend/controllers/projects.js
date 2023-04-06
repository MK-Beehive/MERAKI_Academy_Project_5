
const  pool  = require("../models/db");



const addproject = (req, res) => {
  const { title , projectDescription , projectPrice , timeExpected , status_id ,
    majority_id , user_id } = req.body;
  const values = [title , projectDescription , projectPrice , timeExpected , status_id ,
    majority_id , user_id ];
  const query = `INSERT INTO projects (title , projectDescription , projectPrice , timeExpected , status_id ,
    majority_id , user_id) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`;

  pool
    .query(query, values)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "project created successfully",
        project: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message:"server Error",
    
      });
    });
};


const getAllprojects = (req, res) => {
 
    const query = `SELECT projects.* ,majority.* , status .* , users.firstname	,users.lastname FROM projects  inner join status on projects.status_id =  status.id inner  join majority on projects.majority_id =  majority.id 
    inner join users  on projects.user_id =  users.id   where projects.is_deleted=0 ;`;
  
    pool
      .query(query)
      .then((result) => {
        res.status(201).json({
          success: true,
          message: "All projects",
          result: result.rows,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error",
        });
      });
  };
  
  

  const getallProjectsforUser = (req, res) => {
    const user_id = req.params.user_id;

  
    const query = `SELECT projects.* ,majority.* , status .* , users.firstname	,users.lastname FROM projects  inner join status on projects.status_id =  status.id inner  join majority on projects.majority_id =  majority.id 
    inner join users  on projects.user_id =  users.id   where projects.is_deleted=0 and  projects.user_id = $1 ;`;
  
    pool
      .query(query, [user_id])
      .then((result) => {
        if (result.rows.length != 0) {
          res.status(201).json({
            success: true,
            message: `All projects for  user: ${user_id}`,
            result: result.rows,
          });
        } else {
          res.status(404).json({
            success: false,
            message: `The user: ${user_id} has no projects`,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error",
        });
      });
  };
  
  
  
  const getprojectsByStatus = (req, res) => {
    const status_id = req.params.status_id;
      console.log("status_id============",status_id)
  
    const query = `SELECT projects.* ,majority.* , status .* , users.firstname	,users.lastname FROM projects  inner join status on projects.status_id =  status.id inner  join majority on projects.majority_id =  majority.id 
    inner join users  on projects.user_id =  users.id   where projects.is_deleted=0 and projects.status_id = $1 ;`;
  
    pool
      .query(query, [status_id])
      .then((result) => {
        if (result.rows.length != 0) {
          res.status(201).json({
            success: true,
            message: `All projects for  user: ${status_id}`,
            result: result.rows,
          });
        } else {
          res.status(404).json({
            success: false,
            message: `The user: ${status_id} has no projects`,
          
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error",
          err:err
        });
      });
  };
  

module.exports = {  addproject,  getAllprojects,  getallProjectsforUser,  getprojectsByStatus,
    // getproject,  UpdateProject,  UpdateProjectStatus,deleteproject
}
