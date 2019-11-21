const router = require('express').Router()

const Controller = require('../../controllers')
const ProfileController = Controller.ProfileController
const middleware = require('../../middlewares/middleware')

router.get('/',middleware,ProfileController.profilePage)
router.get('/logout',middleware,ProfileController.logout)
router.get('/delete',middleware,ProfileController.deleteAccount)
router.get('/add-balance',middleware,ProfileController.addBalancePage)
router.post('/add-balance',middleware,ProfileController.addBalancePost)
router.get('/pay',middleware,ProfileController.payTicketPage)
router.post('/pay',middleware,ProfileController.payTicketPost)
router.get('/edit',middleware,ProfileController.editPage)
router.post('/edit',middleware,ProfileController.editPost)

module.exports = router