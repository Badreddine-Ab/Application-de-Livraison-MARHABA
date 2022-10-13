const express = require('express')
const routerManager = express.Router()

const {GetUserManger} = require('../Controllers/MangerController')

routerManager.get('/me',GetUserManger)



module.exports = routerManager