require('dotenv').config();
const nodemailer = require('nodemailer');

//const config = require('../config/mailer');

let sendEmail = async function (email, secretToken) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smpt.gmail.com',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    let mailOptions = {
        from: 'yabba3times@gmail.com',
        to: email,
        subject: "Hello ✔",
        text: `Hello! Thanks for registering!<br>
        You can soon begin to Yabba.<br>
        Verify Your email by typing this token: <br>
        <br> `+ secretToken + `<br>
        On the following page:
        <a href="localhost:3000/users/verifyemail>localhost:3000/users/verifyemail</a> <br><br>
        Have a Yabba day!`,
        html: `Hello! <br>
        Thanks for registering! <br>
        You can soon begin to Yabba. <br><br>
        Verify Your email by typing this token: <br>
        <br>`+ secretToken + `</br>
        On the following page:
        <a href="localhost:3000/users/verifyemail>localhost:3000/users/verifyemail</a> <br><br>
        Have a Yabba day! `,
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log('Error had happend', err);
        } else {
            console.log('Email sent');
        }
    });
}
module.exports = sendEmail;
