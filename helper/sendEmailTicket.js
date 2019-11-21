const nodemailer = require('nodemailer');

function sendEmailTicket(user,event,ticket,status){
    const email = user.email;
    const name = user.fullname
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
        subject: 'Success Booking Ticket at Gigs.in',
        html: `
        <h1>Please pay according to the nominal value received in Gigs.in</h1>
        <p>This is your ticket information</p>
        <p>name : ${name}</p>
        <p>email : ${email}</p>
        <p>event name : ${event.name}</p>
        <p>event location : ${event.location}</p>
        <p>event date : ${event.date}</p>
        <p>invoice  : ${ticket.invoice}</p>
        <p>quantity : ${ticket.quantity} </p>
        <p>price : ${event.price}</p>
        <p>total : ${ticket.getTotal(event.price)}</p>
        <p>status : ${ticket.status}</p>
        `
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
}
module.exports = sendEmailTicket;