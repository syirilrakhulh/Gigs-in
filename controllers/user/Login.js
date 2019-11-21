const models = require('../../models')
const User = models.User
const comparePassword = require('../../helper/comparePassword')

class LoginController{

    static loginPage(req,res){
        const errors = req.query.errors || []
        const values = {}
        const user = {}
        res.render('user/cadangan2',{errors,values,user})
    }

    static loginPost(req,res){
        const email = req.body.email
        const password = req.body.password
        const condition = {
            where : {
                email : req.body.email
            }
        }
        User
            .findOne(condition)
            .then(user=>{
                if(user){
                    if(comparePassword(password,user.password)){
                        req.session.user = {
                            id : user.id,
                            firstName : user.firstName,
                            lastName : user.lastName,
                            address : user.address,
                            phone : user.phone,
                            role : user.role,
                            balance : user.balance,
                            email : user.email,
                            fullname : user.getFullName()
                        }
                        res.redirect('/')
                    }else{
                        const errors = ['Email / Password wrong']
                        const values = req.body
                        const user = {}
                        res.render('user/cadangan2',{errors,values,user})
                    }
                }else{
                    const user = {}
                    const errors = ['User not found']
                    const values = req.body
                    res.render('user/cadangan2',{errors,values,user})
                }
            })
            .catch(err=>{
                res.send(err)
            })

    }

}

module.exports = LoginController