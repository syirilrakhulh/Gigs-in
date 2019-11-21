var QRCode = require('qrcode')
 
// QRCode.toDataURL('Ini QRCODE', function (err, url) {
//   console.log(url)
// })

const nodemailer = require('nodemailer');

async function sendEmail(user,password){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: `gigs.in.ticket@gmail.com`,
               pass: `12345syx`
           }
       });
       const message = `halloo`
       QRCode
        .toDataURL(message)
        .then(imgUrl => {
            const base64Data = imgUrl.replace(/^data:image\/png;base64,/,"")
            const binaryData = Buffer.from(base64Data, 'base64');
            const mailOptions = {
                from: `gigs.in.ticket@gmail.com`,
                to: `syirilrakhulhaqim@gmail.com`,
                subject: ' at Gigs.in',
                html: `
                <h1>Payment successful</h1>
                <p>Save this evidence for warranty claims if an event is canceled or refunded</p>
                <img src="cid:qr@example.com" alt="Logo" title="Logo" style="display:block" width="300" height="300">`,
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

sendEmail()

module.exports = sendEmail;