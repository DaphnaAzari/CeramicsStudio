const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    try {
        // validate required environment variables
        if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            throw new Error('Email configuration is missing. Check your .env file.');
        }

        // create transporter
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT) || 587,
            secure: process.env.EMAIL_PORT === '465', // true for port 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            // add timeout 10 secs
            connectionTimeout: 10000,
        });

        // verify transporter configuration 
        await transporter.verify();
        console.log('Email transporter is ready');

        // email options
        const mailOptions = {
            from: `"The Ceramics Studio Co-op" <${process.env.EMAIL_USER}>`,
            to: options.to,
            subject: options.subject,
            text: options.text,
            // Optional: Add HTML version for better formatting
            html: options.html || options.text.replace(/\n/g, '<br>'),
        };

        // send email
        const info = await transporter.sendMail(mailOptions);

        // Log success
        console.log(`Email sent successfully to: ${options.to}`);
        console.log(`Message ID: ${info.messageId}`);

        // preview URL ( because of using Ethereal service)
        const previewUrl = nodemailer.getTestMessageUrl(info);
        if (previewUrl) {
            console.log(`Preview URL: ${previewUrl}`);
        }

        return info;

    } catch (err) {
        console.error('Error sending email:', err.message);

        // provide more specific error messages
        if (err.code === 'EAUTH') {
            throw new Error('Email authentication failed. Check your EMAIL_USER and EMAIL_PASS.');
        } else if (err.code === 'ECONNECTION') {
            throw new Error('Could not connect to email server. Check EMAIL_HOST and EMAIL_PORT.');
        } else {
            throw new Error(`Email could not be sent: ${err.message}`);
        }
    }
};

module.exports = sendEmail;

// const nodemailer = require('nodemailer');

// const sendEmail = async (options) => {
//     try {

//         const transporter = nodemailer.createTransport({
//             host: process.env.EMAIL_HOST,
//             port: process.env.EMAIL_PORT,
//             secure: false,
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS,
//             },
//         });

//         // email options
//         const mailOptions = {
//             from: `"The Ceramics Studio Co-op" <${process.env.EMAIL_USER}>`,
//             to: options.to,
//             subject: options.subject,
//             text: options.text,
//         };

//         // send email
//         const info = await transporter.sendMail(mailOptions);


//         const previewUrl = nodemailer.getTestMessageUrl(info);

//         console.log(`Email sent! Message ID: ${info.messageId}`);
//         if (previewUrl) {
//             console.log(`Preview URL: ${previewUrl}`);
//         }
//     } catch (err) {
//         console.error('Error sending email:', err);
//         throw new Error('Email could not be sent');
//     }
// };

// module.exports = sendEmail