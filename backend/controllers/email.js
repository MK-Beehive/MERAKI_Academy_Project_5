const pool = require('../models/db');
const nodemailer = require('nodemailer');

const creatEmail = (req,res)=>{

    const { info, subject,massege} = req.body
    console.log(req.body)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'hivebeefreelancer@gmail.com',
          pass: 'duluzhxuxkjkampr'
        }
      });
      
      const mailOptions = {
        from: 'beehivefreelance@gmail.com',

        to: info.email,
        subject: subject,
        text: massege

      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
       console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          console.log("99")
          // do something useful
        }
      });
}



module.exports = { creatEmail};

