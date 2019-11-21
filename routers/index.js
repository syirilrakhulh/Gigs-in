const registerRouter = require('./user/register')
const eventRouter = require('./event/event')
const profileRouter = require('./user/profile')
const loginRouter = require('./user/login')
const ticketRouter = require('./ticket/ticket')

module.exports = {registerRouter,eventRouter,profileRouter,loginRouter,ticketRouter}