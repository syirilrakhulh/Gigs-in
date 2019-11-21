const nodemailer = require('nodemailer');

function sendEmail(user,password){
    const email = user.email;
    const name = user.getFullName()
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: `${process.env.EMAIL_ACCOUNT}`,
               pass: `${process.env.PASSWORD_ACCOUNT}`
           }
       });
    
       const mailOptions = {
        from: `${process.env.EMAIL_ACCOUNT}`,
        to: `${email}`,
        subject: 'Registration success at Gigs.in',
        html: `
        <h1>Thanks for become our member</h1>
        <p>This is your account information</p>
        <p>name : ${name}</p>
        <p>email : ${email}</p>
        <p>password  : ${password}</p>
        <p>for complete informaton your account please login at Gigs.in</p>
        `
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
}
module.exports = sendEmail;