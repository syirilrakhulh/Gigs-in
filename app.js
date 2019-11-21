if(process.env.NODE_ENV === 'development'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = 3000

const routers = require('./routers')
const register = routers.registerRouter
const event = routers.eventRouter
const profile = routers.profileRouter
const login = routers.loginRouter
const ticket = routers.ticketRouter
const moneyFormat = require('./helper/moneyFormat')
const session = require('express-session')

app.locals.moneyFormat = moneyFormat

app.set('view engine','ejs')

app.use(express.urlencoded({extended:true}))

app.use(session({
    secret: 'cute cat',
    resave: false,
    saveUninitialized: true
  }))

app.get('/',(req,res)=>{
    let user = {}
    if(req.session.user){
        user = req.session.user
    }
    res.render('',{user})
})

app.use('/register',register)

app.use('/login',login)

app.use('/events',event)

app.use('/profile',profile)

app.use('/ticket',ticket)

app.listen(PORT,()=>console.log('Listening to port '+PORT))