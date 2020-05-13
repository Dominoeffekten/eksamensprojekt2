const nodemailer = require('nodemailer');
const config = require('../config/mailer');

let testAccount = nodemailer.createTestAccount();
        
 // create reusable transporter object using the default SMTP transport
 var transporter = nodemailer.createTransport({
    host: "smtp.exampel.com",
    service: 'exampel',
    auth: {
      user: 'username',
      pass: 'password'
    }
  });
        
        
// send mail with defined transport object
exports.sendEmail = async function(toEmail, secretToken) {
    var message = await transporter.sendMail({
        from: ' "YabbaYabbaYabba 👻" <admin@yabba.com>',
        to: toEmail,
        subject: "Hello ✔",
        text: `Hello! Thanks for registering!<br>
        You can soon begin to Yabba.<br>
        Verify Your email by typing this token: <br>
        <br> ${secretToken}<br>
        On the following page:
        <a href="localhost:3000/users/verifyemail>localhost:3000/users/verifyemail</a> <br><br>
        Have a Yabba day!`,
        html: `Hello! <br>
        Thanks for registering! <br>
        You can soon begin to Yabba. <br><br>
        Verify Your email by typing this token: <br>
        <br>${secretToken}</br>
        On the following page:
        <a href="localhost:3000/users/verifyemail>localhost:3000/users/verifyemail</a> <br><br>
        Have a Yabba day! `
    });
};
        
        
/*
module.exports = {
    sendEmail(from, to, subject, html) {
        return new Promise((resolve, reject) => {
            transport.sendMail({ from, subject, to, html }, (err, info) => {
                if (err) reject(err);
        
                resolve(info);
            })
        })
    }
}
*/