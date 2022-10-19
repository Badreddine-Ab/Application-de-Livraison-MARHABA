const express = require('express')
const router = express.Router()

const {Login,Register,VerifyUser,ForgetPassword,ResetPassword} = require('../Controllers/AuthController')

router.post('/login',Login)
router.post('/register',Register)
router.get("/confirm/:confirmationCode",VerifyUser)
router.post('/forgetpassword',ForgetPassword)
router.post('/resetpassword/:token',ResetPassword)



module.exports = router