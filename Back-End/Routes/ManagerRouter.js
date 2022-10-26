const express = require('express')
const routerManager = express.Router()

const {GetUserManger} = require('../Controllers/MangerController')
const { IsManager } = require('../Middlewares/auth.middleware')

routerManager.get('/me',IsManager,GetUserManger)



module.exports = routerManager