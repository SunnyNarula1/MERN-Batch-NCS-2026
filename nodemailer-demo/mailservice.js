const nodemailer = require('nodemailer')
require('dotenv').config()

async function SendEmail(toAddress, mailSubject, message, attachments) {
    // Step 1. Create test account for sending email. Can be used for testing purposes.
    let testAccount = await nodemailer.createTestAccount();

    // Step 2. Configure transporter object
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL_USER_ID,
            pass: process.env.GMAIL_USER_PASSWORD
        }
    })

    // Step 3. Configure email message
    let email = {
        from: 'stackroute081@gmail.com',
        to: toAddress,
        subject: mailSubject,
        html: message,
        attachments: attachments
    }

    // Step 4. Send Email
    let msg = await transporter.sendMail(email)    
    return nodemailer.getTestMessageUrl(msg)
}

module.exports = SendEmail