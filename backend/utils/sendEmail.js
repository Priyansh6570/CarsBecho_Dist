import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    try {
    
        const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: 'smtp.hostinger.com', 
        auth: {
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD,
        },
        });  

        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: options.email,
            subject: options.subject,
            text: options.message,
        };

        const result = await transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export default sendEmail;

