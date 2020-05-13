const nodemailer = require('nodemailer');
//const config = require('../config/mailer');

exports.sendEmail = async function(toEmail, secretToken) {
    console.log(toEmail);
    console.log(secretToken);

    // 1) Create a transporter
    var transport = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    // 2) Define the email options
    var message = {
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
    };
    // 3) Actually send the email
    transport.sendMail(message, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent');
        }
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