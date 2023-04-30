const pool = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.SALT);
const { OAuth2Client } = require('google-auth-library');

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
      console.log("result",result.rows)
      console.log("result",password)

        if (result.rows.length) {

        
          bcrypt.compare(password, result.rows[0].password, (err, response) => {
            if (err) res.json(err);
          console.log("result",response)

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
                message: `   The email doesn’t exist or the password you’ve entered is incorrect`,
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
      const query = `select roles.id,   users.firstName , users.lastName , users.email, roles.role,  information.jobTitle ,majority.majorityName from users  inner join information  on users.id = information.user_id inner join majority  on information.majority_id = majority.id inner join  roles on roles.id=users.role_id ;`;
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
  
    const encryptedPassword = password ? await bcrypt.hash(password, saltRounds) : null ; // hash the new password
   
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


const getallFreelancers = (req, res) => {
const {filter ,filtervalue,filtervalue2} =req.body

  const {limit , offset } = req.query
  console.log("filter ,filtervalue", filter ,filtervalue ,req.body)
  let placholder ;
  let query;
  let queryCount;
  const  placholder1 = [limit,offset]
  const  placholder2 =  [limit,offset,filtervalue]
  const  placholder3 =  [limit,offset,filtervalue,filtervalue2]


const  query1 = `select   users.firstName, users.lastName, users.email, users.password, users.role_id ,information.id ,information.informationdescription,    information.jobTitle,    information.image,    information.cv,    information.user_id,    information.majority_id,    information.rate,    information.experiance_id ,experiance.experianceName ,majority.majorityName from users  inner join information  on users.id = information.user_id  
 inner join experiance on experiance.id = information.experiance_id  
 inner join  majority  on    information.majority_id = majority.id 
 
 where   users.is_deleted = 0  and users.role_id = 2 
 
 limit $1 offset $2 ;`

const query2 = `select   users.firstName, users.lastName, users.email, users.password, users.role_id ,information.id , 
 information.informationdescription,    information.jobTitle,    information.image,    information.cv,    information.user_id,    information.majority_id,    information.rate,    information.experiance_id ,experiance.experianceName  ,majority.majorityName
 from users 
  inner join information  on users.id = information.user_id  
  inner join experiance on experiance.id = information.experiance_id  
  inner join  majority  on    information.majority_id = majority.id 
 
  where users.is_deleted = 0  and users.role_id = 2  
  and information.majority_id =$3
   limit $1 offset $2 ;`

   const  query3 = `select   users.firstName, users.lastName, users.email, users.password, users.role_id ,information.id ,
   information.informationdescription,    information.jobTitle,    information.image,    information.cv,    information.user_id,    information.majority_id,    information.rate,    information.experiance_id ,experiance.experianceName  ,majority.majorityName
   from users 
    inner join information  on users.id = information.user_id  
    inner join experiance on experiance.id = information.experiance_id  
    inner join  majority  on    information.majority_id = majority.id 
   
    where users.is_deleted = 0  and users.role_id = 2  
    and information.experiance_id=$3 and information.majority_id =$4
     limit $1 offset $2 ;`

     const queryCount1 = `select  COUNT(*) as countFreelancers from  ( select   users.firstName, users.lastName, users.email, users.password, users.role_id ,information.id ,
      information.informationdescription,    information.jobTitle,    information.image,    information.cv,    information.user_id,    information.majority_id,    information.rate,    information.experiance_id ,experiance.experianceName  
      from users 
       inner join information  on users.id = information.user_id  
       inner join experiance on experiance.id = information.experiance_id  
       inner join  majority  on    information.majority_id = majority.id 
      
        where users.is_deleted = 0  and users.role_id = 2 
    
    ) newtable;`;
    const queryCount2 = `select  COUNT(*) as countFreelancers from  ( select   users.firstName, users.lastName, users.email, users.password, users.role_id ,information.id ,
      information.informationdescription,    information.jobTitle,    information.image,    information.cv,    information.user_id,    information.majority_id,    information.rate,    information.experiance_id ,experiance.experianceName  
      from users 
       inner join information  on users.id = information.user_id  
       inner join experiance on experiance.id = information.experiance_id  
       inner join  majority  on    information.majority_id = majority.id 
      
        where users.is_deleted = 0  and users.role_id = 2 
        and information.majority_id =${filtervalue}
    ) newtable;`;
    

    const queryCount3 = `select  COUNT(*) as countFreelancers from  ( select   users.firstName, users.lastName, users.email, users.password, users.role_id ,information.id ,
      information.informationdescription,    information.jobTitle,    information.image,    information.cv,    information.user_id,    information.majority_id,    information.rate,    information.experiance_id ,experiance.experianceName  
      from users 
       inner join information  on users.id = information.user_id  
       inner join experiance on experiance.id = information.experiance_id  
       inner join  majority  on    information.majority_id = majority.id 
      
        where users.is_deleted = 0  and users.role_id = 2 
        and information.experiance_id=${filtervalue} and information.majority_id =${filtervalue2}
    ) newtable;`;
    


   
  if (filter == "ALL" || filtervalue == 0){
       query=query1
       placholder = placholder1
       queryCount=queryCount1

  }else if(filter == 'majority'  &&  filtervalue != 0){
    console.log("filter == majority &&  filtervalue != 0")
       query=query2
      placholder= placholder2
      queryCount=queryCount2

  }else if(filter == "experiance"  &&  filtervalue != 0){
       query=query3
 
      placholder=placholder3
      queryCount=queryCount3
    
  }

console.log("getallFreelancers---",offset)
console.log("getallFreelancers---",filtervalue)

console.log("getallFreelancers---",filter)

  pool
    .query(query,placholder)
    .then((result) => {

  
    
      pool
        .query(queryCount)
        .then((resultqueryCount) => {
      if (result.rows.length != 0) {
        res.status(201).json({
          success: true,
          message: `All Freelancers user:`,
          result: result.rows,
          count :  resultqueryCount.rows,
        });
      } else {
        res.status(404).json({
          success: false,
          message: `no Freelancer `,
        });
      }

    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    });

    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    });
};



const tokenjwt = (req, res) => {

  const { client_id, jwtToken } = req.body;

  async function verify(client_id, jwtToken) {
    const client = new OAuth2Client(client_id);
    // Call the verifyIdToken to
    // varify and decode it
    const ticket = await client.verifyIdToken({
        idToken: jwtToken,
        audience: client_id,
    });
    // Get the JSON with all the user info
    res.status(201).json({
       
       result: ticket.getPayload(),
    })
    // const payload = ticket.getPayload();
    // This is a JSON object that contains
    // all the user info

    // return payload;
}

 verify(client_id, jwtToken )

        
};

const members =(req,res) =>{
 
    const email = req.body.email;


    const query = `SELECT * FROM users WHERE email = $1 AND is_deleted = 0`;
    const data = [email.toLowerCase()];
    pool
      .query(query, data)
      .then((result) => {
  
        if (result.rows.length) {
                 res.status(200).json({
                  success: true,
                  message:true,
                 
                });
              } else {
                res.status(200).json({
                  success: true,
                  message:false,
              })
            }

          })
      .catch((err) => {
        res.status(403).json({
          success: false,
          message:
            "The email doesn’t exist ",
          err,
        });
      });
  };

  const   getOneUserByID  =(req,res) =>{
    const {id} = req.params;

    console.log("==============================",id)

    const query = `SELECT * FROM users WHERE id = $1 AND is_deleted = 0`;
   
    pool
      .query(query, [id])
      .then((result) => {
  console.log("==============================",id,result.rows)
        if (result.rows.length) {
                 res.status(200).json({
                  success: true,
                  result:result.rows[0],
                 
                });
              } else {
                res.status(200).json({
                  success: true,
                  result:"no user",
              })
            }

          })
      .catch((err) => {
        res.status(403).json({
          success: false,
          message:
            "The email doesn’t exist ",
          err,
        });
      });
  };
  const getuserbyrole = (req,res)=>{

    pool.query(`SELECT users.*, information.*, experiance.experianceName, majority.majorityName  FROM users INNER JOIN information ON users.id=information.user_id INNER JOIN experiance ON 
    experiance.id= information.experiance_id INNER JOIN majority ON majority.id= information.majority_id
    WHERE role_id=2`).then((result)=>{
     res.json(result.rows)
    }).catch((err)=>{
      res.json(err)
    })
  }

  const postnotification  = (req,res)=>{
const userId = req.params.id
console.log(userId)
const {messageNotifction, project_id } = req.body
const placholder = [messageNotifction,project_id,userId]
pool.query(`INSERT INTO notification (notificationMessage,project_id,user_id) VALUES ($1,$2,$3) RETURNING * `,placholder).then((result)=>{
  console.log(result.rows)
  res.json(result.rows)
}).catch((err)=>{
  console.log(err)
  res.json(err)
})
  }


const sendMessagenotification = (req,res)=>{
  const {chatnotification,room_id,user_id,sender_id,imageuser} = req.body
  const placholder = [chatnotification,room_id,user_id,sender_id,imageuser]
  pool.query(`INSERT INTO chatnotification (chatnotification,room_id,user_id,sender_id,imageuser) VALUES ($1,$2,$3,$4,$5) RETURNING * `,placholder).then((result)=>{
    console.log(result.rows)
    res.json(result.rows)
  }).catch((err)=>{
    console.log(err)
    res.json(err)
  })
}


  const getnotieficationBYuserId  = (req,res)=>{
    const userId = req.params.id
pool.query(`SELECT * FROM notification WHERE user_id =${userId}`).then((result)=>{
  res.json(result.rows)
}).catch((err)=>{
  res.json(err)
})
  }


  // console.log(result.rows)
  // if(result.rows.length===0){
  //   pool.query(`SELECT * FROM notification WHERE sender_id =${userId}`).then((result)=>{
  //     res.json(result.rows)
  //   }).catch((err)=>{
  //     res.json(err)
  //   })
  // }


const getmessagenotification  = (req,res)=>{
  const userId = req.params.id
  pool.query(`SELECT * FROM chatnotification WHERE user_id =${userId} ORDER BY id DESC`).then((result)=>{
    console.log(result.rows)
    res.json(result.rows)
  }).catch((err)=>{
    res.json(err)
  })
}

  module.exports = {
    register,
    login,
    getAllUsers,
    deleteUserById,
    updateUserById,
    getallFreelancers,
    tokenjwt,
    members,getuserbyrole,
    postnotification,
    getnotieficationBYuserId,

    sendMessagenotification,
    getmessagenotification,
  

    getOneUserByID


  };
