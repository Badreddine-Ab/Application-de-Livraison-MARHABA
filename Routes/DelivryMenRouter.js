const express = require('express')
const routerDelivryMen = express.Router()

const {GetUserLivreure} = require('../Controllers/DelivryMenController')

routerDelivryMen.get('/me',GetUserLivreure)



module.exports = routerDelivryMen