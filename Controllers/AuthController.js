const User = require('../Models/userModel')
const bcrypt = require('bcryptjs')
const apiError = require('../Utils/apiError')
const { response } = require('express')
// method : post
// url : api/auth/login
// acces : Public
 const Login =  async (req,res) => {
    const {username, password} = req.body
    const user = await User.findOne({username}).lean()
    res.status(200).send(req.body)
}

// Re
const Register =  async (req,res,next) => {
    const {username,password: plainTextPassword} = req.body
    if(!username || typeof username !== 'string'){
       return next( new apiError(`Invalid Username`,409))
    }
    if(!plainTextPassword || typeof plainTextPassword !== 'string'){
        return next( new apiError(`Invalid password`,409))
    }
    if(!plainTextPassword.length < 5){
        return next( new apiError(`Password too short, should be at least 6 charachters`,409))
    }
    
    const password = await bcrypt.hash(plainTextPassword, 3)
    try{
        const response = await User.create({
            username,
            password
        })
         new apiError(`User created succesfully`,200)
    }catch(error){
        if(error.code === 11000){
            return next( new apiError(`Username already in use`,400))
        }throw error
    }

    res.json({ status:'ok'})
}
const ForgetPassword =  (req,res) => {
    res.status(200).send('this a Forget Password function')
}
const ResetPassword =  (req,res) => {
    // token = req.params.id
    res.status(200).send('this a reset Password function of')
}



module.exports = {
    Login,
    Register,
    ForgetPassword,
    ResetPassword
}