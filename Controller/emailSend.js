const nodemailer = require("nodemailer");

async function emailSend(req, res) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        // secure: true,
        auth: { 
            user: 'agustin.rutherford14@ethereal.email',
            pass: '3ehCwnhtHw23X5QWnY'
        } 
    }); 

    const info = await transporter.sendMail({
        from: '"Rijwan Hossain" <rijyanhossain@gmail.com>', // sender address
        to: "boogy@boogy.com", // list of receivers
        subject: "Teaching", // Subject line
        text: "Hello world?", // plain text body
        html: `<div>
            <h1>Hello Students</h1>
            <p>Trainer of Mount Stack</p>
            <a href="https://www.youtube.com/channel/UC0eb_aEN3qjuQX9c6VEOauQ">Mount Stack</a>
        </div>`, // html body
    }) 

    res.json({
        message: 'Mail sent', 
        EmailId: info.messageId
    })
}

module.exports = emailSend; 