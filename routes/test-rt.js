const controllers = require('../controllers')
const express = require('express')

const router = express.Router()

router.get('/hello', controllers.hello)

module.exports = router