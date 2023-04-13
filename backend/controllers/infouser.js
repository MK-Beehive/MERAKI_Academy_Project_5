const pool = require("../models/db");

const addinfoUser = (req, res) => {
  const iduser = req.params.id;
  const {
    informationdescription,
    jobTitle,
    image,
    cv,
    user_id,
    majority_id,
    rate,
    experiance_id
  } = req.body;
  const placeholder = [
    informationdescription,
    jobTitle,
    image ||
      "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg",
    cv,
    iduser,
    majority_id,
    rate,
    experiance_id
  ];

  const query = `INSERT INTO information (informationdescription,jobTitle,image,cv,user_id,majority_id,rate,experiance_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)  RETURNING*`;

  pool
    .query(query, placeholder)
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

const updateInfo = (req, res) => {
  const iduser = req.params.id;
  console.log(iduser);
  const {
    informationdescription,
    jobTitle,
    image,
    cv,
    majority_id,
    skills_id,
  } = req.body;
  const placeholder = [
    informationdescription || null,
    jobTitle || null,
    image ||
      "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg",
    cv || null,
    majority_id || null,
  ];
  pool
    .query(
      `UPDATE information SET informationdescription=COALESCE($1,informationdescription),jobTitle=COALESCE($2,jobTitle),image=COALESCE($3,image),cv=COALESCE($4,cv),majority_id=COALESCE($5,majority_id) WHERE id =${iduser} RETURNING *;`,
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
const getinfoUser = (req, res) => {
  const iduser = req.params.id;
  pool
    .query(
      `SELECT information.*,majority.majorityName,users.firstName,users.lastName  FROM information INNER JOIN majority ON information.majority_id = majority.id INNER JOIN users ON information.user_id = users.id WHERE information.user_id = ${iduser} AND users.is_deleted=0`
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "all info is loaded",
        info: result.rows,
      });
      console.log(result);
    })
    .catch((err) => {
      res
        .json({ success: false, massage: "Server error", err: err })
        .status(500);
    });
};

module.exports = { addinfoUser, updateInfo, getinfoUser };
