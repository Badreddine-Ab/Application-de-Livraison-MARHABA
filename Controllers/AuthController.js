
const User = require('../Models/userModel')
const bcrypt = require('bcryptjs')
const apiError = require('../Utils/apiError')
const { response } = require('express')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'jlhfzmkugfajgfauig'
const Role = require('../Models/roleModel')
const nodemailer = require('../Config/nodemailer.config')
const {LocalStorage} = require("node-localstorage")

const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
let token = '';
for (let i = 0; i < 25; i++) {
    token += characters[Math.floor(Math.random() * characters.length )];
}
var localStorage = new LocalStorage('./scratch')

// method : post
// url : api/auth/login
// acces : Public
 const Login =  async (req,res,next) => {
    const {email, password} = req.body
    const user = await User.findOne({email}).lean().populate('role')
    
    if(!user){
        return next( new apiError('Invalid email/password',400))
    }
   if(await bcrypt.compare(password,user.password) && user && user.status == 'Pending'){
    return next( new apiError("Pending Account. Please Verify Your Email!",401))
   }
    if(await bcrypt.compare(password,user.password)){

        const token = jwt.sign({ 
            id: user._id,
            email: user.email,
            username:user.username
        }, 
        JWT_SECRET
        )
        // console.log('Got the token:', token)
        localStorage.setItem('token',token)
        console.log('this is the token '+localStorage.getItem('token'))
        // return res.json({status:'ok', data:token})
        return res.status(200).send(token)
    }
}

// Re
const Register =  async (req,res,next) => {
    
  const token = jwt.sign({email: req.body.email}, process.env.secret)

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    role:req.body.role,
    confirmationCode: token
  });

  user.save((err) => {
    if (err) {
      next( new apiError('AN error has accured',500))
           return;
        }
       res.send({
           message:
             "User was registered successfully! Please check your email",
        });
        const link = `http://localhost:${process.env.PORT}/api/auth/confirm/${user.confirmationCode}`

      nodemailer.sendConfirmationEmail(
         user.username,
         user.email,
         link
  );
});
   
}
const VerifyUser = (req, res, next) => {
    User.findOne({
      confirmationCode: req.params.confirmationCode,
    })
      .then((user) => {
        if (!user) {
          return next(new apiError('User not founs!',404))
        }
  
        user.status = "Active";
        user.save((err) => {
          if (err) {
            return next(new apiError (err,500))
            
          }
        });
      })
      .catch((e) => console.log("error", e));
  };

const ForgetPassword = async (req,res,next) => {
  const {email} = req.body
  let user = await User.findOne({email})
  if(email !== user.email){
    return next(new apiError("User not registered",404))
  }
  // User exist and now create a one time link valid for 10minutes
  // const secret = JWT_SECRET + user.password
  // const payload = {
  //   email:user.email,
  //   id:user._id
  // }
  // const token = localStorage.getItem('token')
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTEwNWQ1NzlhZmE0OGFmMDY4ZTg0OCIsImVtYWlsIjoiYWJvZG9sbGFyLmNhcGdlbWluaUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImJhZHIiLCJpYXQiOjE2NjYyNzQyNDh9.afVwVRhOH6eFQ6QR7Z_Da_dJ0VBAuUDmkbCxtAshY7s"

const link = `http://localhost:8080/api/auth/resetpassword/${token}`
res.send("Password link has been sent t your email...")
nodemailer.sendConfirmationEmail(
         user.username,
         user.email,
         link
  ); 
console.log(link)
}
const ResetPassword = async (req,res,next) => {
  const {token} = req.params
    const newpassword = await  req.body
    try {
      const user = jwt.verify(token, JWT_SECRET)
  console.log(user)
      const _id = user.id
      const password= bcrypt.hashSync(req.body.newpassword, 8)
      await User.findByIdAndUpdate(_id,
        {
          password
        })
      return res.status(200).send('status changed')
    } catch(error){
      console.log(error)
      next(new apiError(';))',400))
    }
  
  
}



module.exports = {
    Login,
    Register,
    VerifyUser,
    ForgetPassword,
    ResetPassword
}