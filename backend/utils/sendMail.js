// const nodemailer=require("nodemailer");

// const sendMail=async(options)=>{
//     const transporter= nodemailer.createTransport({
//         host:process.env.SMTP_HOST,
//         port:process.env.SMTP_PORT,
//         service:process.env.SMTP_SERVICE,
//         auth:{
//             user: process.env.SMTP_MAIL,
//             pass: process.env.SMTP_PASSWORD,
//         },
//     });

//     const mailOptions={
//         from:process.env.SMTP_MAIL,
//         to: options.email,
//         subject: options.subject,
//         text: options.message,

//     };

//     await transporter.sendMail(mailOptions);
// };
// console.log(process.env.SMTP_HOST, process.env.SMTP_PORT, process.env.SMTP_SERVICE);


// module.exports= sendMail;
const nodemailer = require("nodemailer");

const sendMail = async (options) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            service:process.env.SMTP_SERVICE,
            secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false, // Ignore self-signed certificate errors
            },
        });

        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: options.email,
            subject: options.subject,
            text: options.message,
            // Optional HTML content
            html: options.html || null,
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Email could not be sent");
    }
};

module.exports = sendMail;

