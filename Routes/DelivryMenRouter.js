const express = require('express')
const routerDelivryMen = express.Router()

const {GetUserLivreure} = require('../Controllers/DelivryMenController')
const { IsDelivryMan, authorization } = require('../Middlewares/auth.middleware')

routerDelivryMen.get('/me',authorization,IsDelivryMan,GetUserLivreure)



module.exports = routerDelivryMen