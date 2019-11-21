const router = require('express').Router()

const Controller = require('../../controllers')
const TicketController = Controller.TicketController
const middleware = require('../../middlewares/middleware')

router.post('/:id/pay',middleware,TicketController.pay)

module.exports = router