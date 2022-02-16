const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require("express-validator")
const authMiddleware = require('./middlewaree/authMiddleware')
const roleMiddleware = require('./middlewaree/roleMiddleware')

router.post('/registration', [
    check('username', "Логин не может быть пустым").notEmpty(),
    check('username', "Необходимо указать Вашу электронную почту").isEmail(),
    check('password', "Пароль должен быть больше 8 и меньше 10 символов").isLength({min:8, max:10}),
], controller.registration)
router.post('/login', controller.login)
router.post('/deleted', controller.deleted)
router.post('/tokenCode', controller.tokenCode)
router.post('/audit', controller.audit)
router.get('/users', roleMiddleware(["ADMIN"]), controller.getUsers)

module.exports = router