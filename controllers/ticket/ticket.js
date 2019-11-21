const models = require('../../models')
const Ticket = models.Ticket
const User = models.User
const Event = models.Event
const sendEmailPaid = require('../../helper/sendEmailPaid')

class TicketController{

   static pay(req,res){
       const condition = {
           where : {
               id  : req.params.id
           },
           include : [Event,User]
       }
       let ticket
       Ticket
       .findOne(condition)
       .then(currTicket=>{
            ticket = currTicket
            if(Number(ticket.User.balance) >= Number(req.body.balance)){
                const total = ticket.getTotal(ticket.Event.price)
                if(total === Number(req.body.balance)){
                    const values = {
                        status : 'Paid'
                    }
                    ticket.status = 'Paid'
                    const userCondition = {
                        where: {
                            id : ticket.User.id
                        }
                    }
                    const userValues = {
                        balance : ticket.User.balance - total
                    }
                    const promises = [
                        Ticket.update(values,condition),
                        User.update(userValues,userCondition)
                    ]
                    req.session.user.balance = userValues.balance
                    return Promise.all(promises)
                }else{
                    throw `/profile/pay?errors[0]=Nominal entered is incorrect`
                }
            }else{
                throw `/profile/pay?errors[0]=Insufficient balance`
                res.redirect()
            }
        })
        .then(changes=> {
            sendEmailPaid(ticket.User,ticket.Event,ticket)
            res.redirect('/profile')
        })
        .catch(err=>{
            res.redirect(err)
            // res.send(err)
        })
   }

}

module.exports = TicketController