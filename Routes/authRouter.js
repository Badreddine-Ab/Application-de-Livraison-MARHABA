const express = require('express')
const router = express.Router()
const {authorization} = require('../Middlewares/auth.middleware')

const {Login,Register,VerifyUser,ForgetPassword,ResetPassword,LogOut, Protected} = require('../Controllers/AuthController')

router.post('/login',Login)
router.post('/register',Register)
router.get("/confirm/:confirmationCode",VerifyUser)
router.post('/forgetpassword',ForgetPassword)
router.post('/resetpassword/:token',ResetPassword)
router.get('/logout',authorization ,LogOut)


module.exports = router