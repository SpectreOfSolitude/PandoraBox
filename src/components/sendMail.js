const nodemailer = require('nodemailer');

const sendMail = async (email, uniqueCode) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Unique Code',
        text: 'Your unique code is ' + uniqueCode
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        } 
    });

}

module.exports = sendMail;