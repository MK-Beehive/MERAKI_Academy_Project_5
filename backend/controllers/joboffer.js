const pool = require("../models/db");

const creatoffer = (req, res) => {
  const idproject = req.params.id;
  
  const {
    budget,
    workday,
    jobOfferStatus_id,
    jobOfferDescription,
    user_id,
  } = req.body;




  const placeholder = [
    budget,
    workday,
    jobOfferStatus_id,
    jobOfferDescription,
    idproject,
    user_id,
  ];
  pool
    .query(
      `INSERT INTO jobOffer (budget,workday,jobOfferStatus_id,jobOfferDescription,project_id,user_id)VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;`,
      placeholder
    )
    .then((result) => {
      res
        .json({
          success: true,
          massage: "add informayion's user successfully",
          result: result.rows,
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

const getoffer = (req, res) => {
  const idproject = req.params.id;
  //INNER JOIN majority ON joboffer.user_id=information.user_id INNER JOIN status ON joboffer.jobofferstatus_id=status.id
  //majority.majorityName, status.statusName
  pool
    .query(
      `SELECT  joboffer.user_id ,jobOffer.id, jobOffer.workday,jobOffer.budget,jobOffer.jobofferdescription, users.firstName, information.image, information.jobtitle  ,majority.majorityName, status.statusName  FROM jobOffer INNER JOIN users ON joboffer.user_id=users.id INNER JOIN information ON joboffer.user_id=information.user_id INNER JOIN majority ON information.majority_id=majority.id INNER JOIN status ON joboffer.jobofferstatus_id=status.id WHERE project_id= ${idproject}`
    )
    .then((result) => {
      res
        .json({
          success: true,
          massage: "GET all offers successfully",
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

const updateOffer = (req, res) => {
  const idOffer = req.params.id;
  const { budget, workday, jobOfferDescription } = req.body;
  const placeholder = [
    budget || null,
    workday || null,
    jobOfferDescription || null,
  ];
  pool
    .query(
      `UPDATE jobOffer SET budget=COALESCE($1,budget),workday=COALESCE($2,workday),jobOfferDescription=COALESCE($3,jobOfferDescription) WHERE id =${idOffer} RETURNING *;`,
      placeholder
    )
    .then((result) => {
      res
        .json({
          success: true,
          message: "information updated successfully",
          info: result.rows,
        })
        .status(200);
    })
    .catch((err) => {
      res
        .json({ success: false, massage: "Server error", err: err })
        .status(500);
    });
};

const updatestatus = (req, res) => {
  const idOffer = req.params.id;
  const { jobOfferStatus_id } = req.body;
  pool
    .query(
      `UPDATE jobOffer SET jobOfferStatus_id=${jobOfferStatus_id} WHERE id =${idOffer} RETURNING *;`
    )
    .then((result) => {
      res
        .json({
          success: true,
          message: "information updated successfully",
          info: result.rows,
        })
        .status(200);
    })
    .catch((err) => {
      res
        .json({ success: false, massage: "Server error", err: err })
        .status(500);
    });
};

const deleteoffer = (req, res) => {
  const idOffer = req.params.id;
  pool
    .query(`DELETE FROM jobOffer WHERE id=${idOffer}RETURNING *;`)
    .then((result) => {
      res
        .json({
          success: true,
          message: "information updated successfully",
          info: result.rows,
        })
        .status(200);
    })
    .catch((err) => {
      res
        .json({ success: false, massage: "Server error", err: err })
        .status(500);
    });
};



const getofferByUser = (req, res) => {
  const user_id = req.params.id;
  console.log(2);
  console.log(user_id);

  const query = `SELECT joboffer.id, joboffer.workday, joboffer.budget, joboffer.jobofferdescription, users.firstName, information.image, majority.majorityName, status.statusName  
  FROM joboffer 
  INNER JOIN users ON joboffer.user_id = users.id 
  INNER JOIN information ON joboffer.user_id = information.user_id 
  INNER JOIN majority ON information.majority_id = majority.id 
  INNER JOIN status ON joboffer.jobofferstatus_id = status.id 
  WHERE joboffer.user_id =$1`;
  pool
    .query(query,[user_id])
    .then((result) => {
      res
        .json({
          success: true,
          massage: "GET all offers successfully",
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







module.exports = {
  creatoffer,
  getoffer,
  updateOffer,
  updatestatus,
  deleteoffer,
  getofferByUser
};
