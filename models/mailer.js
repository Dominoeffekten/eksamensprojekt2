const nodemailer = require('nodemailer');
const config = require('../models/mailer');

const transport = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
        user: config.MAILGUN_USER,
        pass: config.MAILGUN_PASS
    },
    tls: {
        rejectUnauthorized: false;
    }
});