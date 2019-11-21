const models = require('../../models')
const User = models.User
const getRandomPassword = require('../../helper/getRandomPassword')
const sendEmail = require('../../helper/sendEmail')

class RegisterContoller{

    static registerPage(req,res){
        const errors = []
        const values = {}
        const user = {}
        res.render('user/cadangan',{errors,values,user})
    }

    static registerPost(req,res){
        const password = getRandomPassword()
        const values = {
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            address : req.body.address,
            phone : req.body.countryCode + req.body.phone,
            email : req.body.email,
            role : 'Customer',
            password
        }
        const user = {}
        User.create(values)
            .then((user)=>{
                sendEmail(user,password)
                res.redirect('/login')
            })
            .catch((err)=>{
                const errors = []
                const arrError = err.message.split('\n')
                for(let i=0;i<arrError.length;i++){
                    errors.push(arrError[i].slice('Validation error: '.length))
                }
                res.render('user/cadangan',{errors,values,user})
            })
    }

    static adminRegisterPage(req,res){
        const errors = []
        const values = {}
        const user = {}
        res.render('user/cadangan',{errors,values,user})
    }

    static adminRegister(req,res){
        const password = getRandomPassword()
        const values = {
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            address : req.body.address,
            phone : req.body.phone,
            email : req.body.email,
            role : 'Admin',
            password
        }
        const user = {}
        User.create(values)
            .then((user)=>{
                sendEmail(user,password)
                res.redirect('/login')
            })
            .catch((err)=>{
                const errors = []
                const arrError = err.message.split('\n')
                for(let i=0;i<arrError.length;i++){
                    errors.push(arrError[i].slice('Validation error: '.length))
                }
                res.render('user/cadangan',{errors,values,user})
            })
    }

}

module.exports = RegisterContoller