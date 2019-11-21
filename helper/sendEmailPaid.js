const QRCode = require('qrcode')

const nodemailer = require('nodemailer');

function sendEmail(user,event,ticket){
    const email = user.email;
    const name = `${user.firstName} ${user.lastName}`
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: `${process.env.EMAIL_ACCOUNT}`,
               pass: `${process.env.PASSWORD_ACCOUNT}`
           }
       });
       const message = `
name : ${name}
email : ${email}
event name : ${event.name}
event location : ${event.location}
event date : ${event.date}
invoice  : ${ticket.invoice}
quantity : ${ticket.quantity} 
price : ${event.price}
total : ${ticket.getTotal(event.price)}
status : ${ticket.status}
Enjoy! and happier!
`
       QRCode
        .toDataURL(message)
        .then(imgUrl => {
            const base64Data = imgUrl.replace(/^data:image\/png;base64,/,"")
            const binaryData = Buffer.from(base64Data, 'base64');
            const mailOptions = {
                from: `${process.env.EMAIL_ACCOUNT}`,
                to: `${email}`,
                subject: 'Thx for buying ticket at Gigs.in',
                html: `
                <h1>Payment successful</h1>
                <p>Save this evidence for warranty claims if an event is canceled or refunded</p>
                <img src="cid:qr@example.com" alt="Logo" title="Logo" style="display:block" width="300" height="300">
                <p>Enjoy your moment! Gigs.in make you happier!`,
                attachments: [{
                    filename: 'image.png',
                    content: binaryData,
                    cid: 'qr@example.com'
                }]
            };
            transporter.sendMail(mailOptions, function (err, info) {
                if(err)
                  throw err
                else
                  console.log(info);
            });
        })
        .catch(err => {
            console.log(err)
        })
      
}

module.exports = sendEmail;