const router = require('express').Router()

const Controller = require('../../controllers')
const LoginController = Controller.LoginController
const loginMiddleware = require('../../middlewares/loginMiddleware')

router.get('/',loginMiddleware,LoginController.loginPage)
router.post('/',loginMiddleware,LoginController.loginPost)
module.exports = router