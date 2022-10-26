const express = require('express')
const routerClient = express.Router()
const authorization = require('../Middlewares/auth.middleware')
const {GetUserClient} = require('../Controllers/ClientController')

routerClient.get('/me',authorization.IsClient,GetUserClient)



module.exports = routerClient