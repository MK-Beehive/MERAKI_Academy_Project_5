const {pool} = require ("../models/db")


const addinfoUser  = (req,res)=>{
    const {informationDescription,jobTitle,image,cv,user_id,majority_id,skills_id} = req.body
const query = `INSERT INTO information (informationDescription,jobTitle,image,cv,user_id,majority_id,skills_id) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURING *`
const placeholser = [informationDescription,jobTitle,image,cv,user_id,majority_id,skills_id]
    pool.query(query,placeholser).then((result)=>{
        res.json({success: true,
            massage: "add informayion's user successfully",
            result:  result.rows}).status(201)
    }).cathch((err)=>{
        res.json({success: false,
            massage: "Server error",
        err: err}).status(500)
    })
}

const updateInfo  =(req,res)=>{
    const {informationDescription,jobTitle,image,cv} = req.body
    const query =`INSERT INTO information (informationDescription,jobTitle,image,cv,majority_id,skills_id) VALUES ($1,$2,$3,$4,$5,$6) RETURING *`
}



module.exports = {addinfoUser,updateInfo}