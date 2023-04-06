const {pool} = require ("../models/db")


const creatoffer = (req,res)=>{
const {budget,workday,jobOfferStatus_id,jobOfferDescription,project_id,user_id} = req.body
const placeholder = [budget,workday,jobOfferStatus_id,jobOfferDescription,project_id,user_id]
pool.query(``) 

}



module.exports = {creatoffer}