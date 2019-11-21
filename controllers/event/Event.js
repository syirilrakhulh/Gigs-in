const models = require('../../models')
const Event = models.Event
const Ticket = models.Ticket
const sendEmailTicket = require('../../helper/sendEmailTicket') 

class LoginController{

    static listEvent(req,res){
        Event
            .findAll()
            .then(events=>{
                const errors = []
                let user = {}
                if(req.session.user){
                    user = req.session.user
                }
                for(let i = 0; i < events.length; i++){
                    events[i].image = new Buffer(events[i].image).toString('base64')
                }
                res.render('event/pageEvent',{events,errors,user})
            })   
            .catch(err=>res.send(err))  
    }

    static addEventPage(req,res){
        let errors = []
        const values = {}
        const user = req.session.user
        res.render('event/formAddEvent',{errors,values,user})
    }

    static addEventPost(req,res){
        if(!req.file){
            let errors = ['Please insert a picture to be used as a cover']
            const values = {
                name : req.body.name,
                location : req.body.location,
                capacity : req.body.capacity,
                price : req.body.price,
                date : req.body.date,
            }
            const user = req.session.user
            res.render('event/formAddEvent',{errors,values,user})
        }else{
            const values = {
                name : req.body.name,
                location : req.body.location,
                capacity : req.body.capacity,
                price : req.body.price,
                date : req.body.date,
                image: req.file.buffer
            }
            Event
                .create(values)
                .then((event)=>res.redirect('/events'))
                .catch((err)=>{
                    const errors = []
                    const arrError = err.message.split('\n')
                    for(let i=0;i<arrError.length;i++){
                        errors.push(arrError[i].slice('Validation error: '.length))
                    }
                    const user = req.session.user
                    res.render('event/formAddEvent',{errors,values,user})
                })
        }
    }

    static deleteEvent(req,res){
        const condition = {
            where : {
                id : req.params.id
            }
        }
        Event
            .destroy(condition)
            .then(changes=>{
                res.redirect('/events')
            })
            .catch(err=>res.send(err))
    }

    static updateEventPage(req,res){
        const condition = {
            where :{
                id : req.params.id
            }
        }
        const user = req.session.user
        let values
        Event
            .findOne(condition)
            .then(event=>{
                values = event
                const errors = []
                res.render('event/formUpdate',{errors,values,user})
            })
            .catch(err=>res.send(err))
    }

    static updateEventPost(req,res){
        const values = {
            name : req.body.name,
            location : req.body.location,
            capacity : req.body.capacity,
            price : req.body.price,
            date : req.body.date
        }
        const condition = {
            where : {
                id : req.params.id
            }
        }
        Event
            .update(values,condition)
            .then(changes=>res.redirect('/events'))
            .catch(err=>{
                const errors = []
                const arrError = err.message.split('\n')
                for(let i=0;i<arrError.length;i++){
                    errors.push(arrError[i].slice('Validation error: '.length))
                }
                const user = req.session.user
                res.render('event/formUpdate',{errors,values,user})
            })
    }

    static buyTicket(req,res){
        const eventId = req.params.id
        const user = req.session.user
        Event
            .findByPk(eventId)
            .then(event=>{
                const errors = []
                const values = {}
                res.render('event/formBuyTicket',{errors,values,event,user})
            })
    }

    static buyTicketPost(req,res){
        const user = req.session.user
        const UserId = req.session.user.id
        const EventId = req.params.id
        const quantity = req.body.quantity
        const status = 'Pending'
        let invoice
        let event
        let ticket
        let currQty
        let values = {
            UserId,
            EventId,
            quantity,
            status,
            invoice
        }
        Event
            .findByPk(EventId)
            .then(currEvent=>{
                event = currEvent
                invoice = Ticket.getInvoiceCode(event,UserId,quantity)
                currQty =  Number(event.capacity) - Number(quantity)
                if(currQty >= 0){
                    return Ticket
                        .create(values)
                }else{
                    const errors = ['Insufficient stock.']
                    throw { message: {errors,values,event,user} }
                    
                }
            })
            .then(newTicket=>{
                ticket = newTicket
                return Event
                    .update({capacity : currQty},{where:{id:EventId}})
                })
            .then(changes=>{        
                sendEmailTicket(user,event,ticket,'ticket')
                res.redirect('/events')
            })
            .catch(err=>{
                const errors = []
                const arrError = err.message.split('\n')
                for(let i=0;i<arrError.length;i++){
                    errors.push(arrError[i].slice('Validation error: '.length))
                }
                const user = req.session.user
                res.render('event/formBuyTicket',{errors,values,event,user})
            })
    }
}

module.exports = LoginController