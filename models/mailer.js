require('dotenv').config();
const nodemailer = require('nodemailer');

//const config = require('../config/mailer');

let sendEmail = async function (email, secretToken) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
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
/*
//Sunes kode
const sendEmail = async (toEmail, secretToken) => {
    // 1) Create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    // 2) Define the email options
    const mailOptions = {
        from: 'Yadda Yadda Yadda <noreply@yaddayaddayadda.com>',
        to: toEmail,
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
        <br>$`+ secretToken + `</br>
        On the following page:
        <a href="localhost:3000/users/verifyemail>localhost:3000/users/verifyemail</a> <br><br>
        Have a Yabba day! `,
    };

    // 3) Actually send the email
    await transporter.sendMail(mailOptions);
};


*/
/*
exports.sendEmail = async function(toEmail, secretToken) {
    console.log(toEmail);
    console.log(secretToken);

    // 1) Create a transporter
    var transport = nodemailer.createTransport({
        host: "localhost",
        port: 3000,
        tls: {
            rejectUnauthorized: false
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
        <br> `+ secretToken +`<br>
        On the following page:
        <a href="localhost:3000/users/verifyemail>localhost:3000/users/verifyemail</a> <br><br>
        Have a Yabba day!`,
        html: `Hello! <br>
        Thanks for registering! <br>
        You can soon begin to Yabba. <br><br>
        Verify Your email by typing this token: <br>
        <br>$`+ secretToken +`</br>
        On the following page:
        <a href="localhost:3000/users/verifyemail>localhost:3000/users/verifyemail</a> <br><br>
        Have a Yabba day! `
    };
    // 3) Actually send the email
    transport.sendMail(message, function(error, info){
        if (error) {
            console.log(transport.options);
            console.log(error);
        } else {
            console.log('Email sent');
            console.log(transport.options);
        }
    });
};
*/

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