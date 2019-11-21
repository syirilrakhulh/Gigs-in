const models = require('../../models')
const User = models.User
const Ticket = models.Ticket
const Event = models.Event

class ProfileController{

    static profilePage(req,res){
        const errors = []
        const values = {}
        const user = req.session.user
        res.render('user/pageProfile',{errors,values,user})
    }

    static profilePost(req,res){

    }

    static logout(req,res){
        req.session.destroy(function(err) {
            if(!err) res.redirect('/')
            else console.log(err)
        })
    }

    static deleteAccount(req,res){
        const condition = {
            where : {
                id : req.session.user.id
            }
        }
        User
            .destroy(condition)
            .then(changes=>{
                res.redirect('/profile/logout')
            })
            .catch(err=>{
                res.send(err)
            })
    }

    static addBalancePage(req,res){
        const errors = []
        const values = {}
        const user = req.session.user
        res.render('user/formAddBalance',{errors,values,user})
    }

    static addBalancePost(req,res){
        const condition = {
            where : {
                id : req.session.user.id
            }
        }
        const values = {
            balance : Number(req.session.user.balance) + Number(req.body.balance)
        }
        User
            .update(values,condition)
            .then(changes=>{
                req.session.user.balance = values.balance
                res.redirect('/profile')
            })
            .catch(err=>{
                const errors = []
                const arrError = err.message.split('\n')
                for(let i=0;i<arrError.length;i++){
                    errors.push(arrError[i].slice('Validation error: '.length))
                }
                const user = req.session.user
                res.render('user/formAddBalance',{errors,values,user})
            })
    }

    static payTicketPage(req,res){
        let errors = []
        if(req.query.errors){
            errors = req.query.errors
        }
        const values = {}
        const user = req.session.user
        res.render('user/formPayTicket',{errors,values,user})
    }

    static payTicketPost(req,res){
        const condition = {
            where :{
                invoice : req.body.invoice
            },
            include : [Event,User]
        }
        const user = req.session.user
        Ticket
            .findOne(condition)
            .then(ticket=>{
                if(ticket){
                    const errors = []
                    const values = ticket
                    values.total = ticket.getTotal(values.Event.price)
                    res.render('user/formPayTicket',{errors,values,user})
                }else{
                    const errors = ['Ticket not found']
                    const values = {}
                    res.render('user/formPayTicket',{errors,values,user})
                }
            })
            .catch(err=>{
                res.send(err)
            })       
    }

    static editPage(req,res){
        const errors = []
        const values = req.session.user
        const user = req.session.user
        res.render('user/formEdit',{errors,values,user})
    }

    static editPost(req,res){
        const values = {
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            address : req.body.address,
            phone : req.body.countryCode + req.body.phone,
            email : req.body.email,
            id : req.session.user.id
        }
        const password = req.body.password
        if(req.body.password !== ""){
            values.password = req.body.password
        }
        const condition = {
            where : {
                id : req.session.user.id
            },
            individualHooks : true 
        }
        User
            .update(values,condition)
            .then(changes=>{
                return User.findByPk(values.id)
            })
            .then(user=>{
                req.session.user.lastName = user.lastName
                req.session.user.fullname = user.getFullName()
                res.redirect('/profile')
            })
            .catch(err=>{
                const errors = [err]
                const values = req.session.user
                const user = req.session.user
                res.render('user/formEdit',{errors,values,user})
                res.send(err)
            })
    }
}

module.exports = ProfileController