const Multer = require('multer');
const router = require('express').Router()

const upload = Multer({storage : Multer.MemoryStorage})
const Controller = require('../../controllers')
const EventController = Controller.EventController
const middleware = require('../../middlewares/middleware')


router.get('/',EventController.listEvent)
router.get('/add-event',middleware,EventController.addEventPage)
router.post('/add-event',middleware,upload.single('image'),EventController.addEventPost)
router.get('/delete/:id',middleware,EventController.deleteEvent)
router.get('/edit/:id',middleware,EventController.updateEventPage)
router.post('/edit/:id',middleware,EventController.updateEventPost)
router.get('/buy/:id',middleware,EventController.buyTicket)
router.post('/buy/:id',middleware,EventController.buyTicketPost)

module.exports = router