const express = require('express')
const router = express.Router()
const {authorization} = require('../Middlewares/auth.middleware')

const {Login,Register,VerifyUserMail,ForgetPassword,ResetPassword,LogOut, Protected, Roles} = require('../Controllers/AuthController')

router.post('/login',Login)
router.post('/register',Register)
router.get("/confirm/:confirmationCode",VerifyUserMail)
router.post('/forgetpassword',ForgetPassword)
router.post('/resetpassword/:token',ResetPassword)
router.get('/logout',authorization ,LogOut)
router.get('/roles',authorization ,Roles)


module.exports = router