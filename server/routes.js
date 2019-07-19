const controller = require('./controller')
const express = require('express')

const router = express.Router()

router.get('/chat/:msgFrom/:msgTo', controller.getChat)
router.get('/user', controller.getUsers)
router.get('/user/:id', controller.getUserById)
router.get('/coordinate', controller.getCoordinate)

router.post('/login', controller.login)
router.post('/register', controller.register)

router.put('/user/:id', controller.setProfile)
router.put('/setposition/:username', controller.setCurrentPosition)

module.exports = router