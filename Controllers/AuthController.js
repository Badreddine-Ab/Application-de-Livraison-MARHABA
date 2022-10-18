const User = require('../Models/userModel')
const Role = require('../Models/roleModel')
const bcrypt = require('bcryptjs')
const apiError = require('../Utils/apiError')
const { response } = require('express')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'jlhfzmkugfajgfauig'
// method : post
// url : api/auth/login
// acces : Public


 const Login =  async (req,res) => {
    const {email, password} = req.body
    const user = await User.findOne({email}).lean()

    if(!user){
        return next( new apiError('Invalid email/password',400))
    }
    if(await bcrypt.compare(password,user.password)){
        const token = jwt.sign({ 
            id: user._id,
            email: user.email,
            username:user.username
        }, 
        JWT_SECRET
        )
        return res.json({ status:"ok", data:token })
    }
}

// Re
const Register =  async (req,res,next) => {
    const {username,password: plainTextPassword,email,role} = req.body
    if(!username || typeof username !== 'string'){
       return next( new apiError(`Invalid Username`,409))
    }
    if(!email || typeof email !== 'string'){
       return next( new apiError(`Invalid email`,409))
    }
    if(!plainTextPassword || typeof plainTextPassword !== 'string'){
        return next( new apiError(`Invalid password`,409))
    }
    
    
    const password = await bcrypt.hash(plainTextPassword, 3)
    try{
        const response = await User.create({
            username,
            email,
            password,
            role
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