const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'rakeshmakvana2108@gmail.com',
        pass: 'bgltlkwteguxprzz'
    }
});

module.exports = transporter;