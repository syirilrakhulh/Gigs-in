const router = require('express').Router()

const Controller = require('../../controllers')
const RegisterContoller = Controller.RegisterController
const loginMiddleware = require('../../middlewares/loginMiddleware')

router.get('/',RegisterContoller.registerPage)
router.post('/',RegisterContoller.registerPost)
router.get('/admin',RegisterContoller.adminRegisterPage)
router.post('/admin',RegisterContoller.adminRegister)

module.exports = router