const express = require('express')
const routerClient = express.Router()

const {GetUserClient} = require('../Controllers/ClientController')

routerClient.get('/me',GetUserClient)



module.exports = routerClient