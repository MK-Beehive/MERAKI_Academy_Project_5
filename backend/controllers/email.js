const pool = require('../models/db');
const nodemailer = require('nodemailer');

const creatEmail = (req,res)=>{
    const to = req.body.to
    const subject =req.body.subject
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'beehivefreelance@gmail.com',
          pass: 'duluzhxuxkjkampr'
        }
      });
      
      const mailOptions = {
        from: 'beehivefreelance@gmail.com',
        // to: 'ebtehal.abuhassan@gmail.com',
        to:to,
        subject: subject,
        text: 'Email content'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
       console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          // do something useful
        }
      });
}



module.exports = { creatEmail};

