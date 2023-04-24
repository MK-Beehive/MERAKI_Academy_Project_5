const pool = require('../models/db');




const postmessage  = (req,res)=>{
const {Messages,room_id,sender_id} = req.body
console.log(req.body)
pool.query(`INSERT INTO chat (Messages,room_id,sender_id)Values ($1,$2,$3)`, [Messages,room_id,sender_id]).then((result)=>{
console.log(result.rows)
res.json(result.rows)
}).catch((err)=>{
    console.log(err)
    res.json(err)
})
}

const getmessage = (req,res)=>{
const roomid = req.params.roomId
 console.log(roomid)

//  `SELECT chat.*, sender.firstname  as sendername,receiver.firstname  as receivername FROM chat  INNER JOIN users as sender on chat.sender_id = sender.id  INNER JOIN users as receiver on chat.receiver_id= receiver.id WHERE room_id =${roomid}`

  pool.query(`SELECT chat.*, sender.firstname  as sendername FROM chat  INNER JOIN users as sender on chat.sender_id = sender.id WHERE room_id =${roomid}`).then((result)=>{
    console.log(result.rows)
    res.json(result.rows)
    }).catch((err)=>{
        console.log(err)
        res.json(err)
    }) 
}





module.exports = { postmessage,getmessage};