
const User = require('../Models/userModel')
const bcrypt = require('bcryptjs')
const apiError = require('../Utils/apiError')
const { response } = require('express')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'jlhfzmkugfajgfauig'
const Role = require('../Models/roleModel')
const nodemailer = require('../Config/nodemailer.config')
const {LocalStorage} = require("node-localstorage")
const authorization = require('../Middlewares/auth.middleware')
const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
let token = '';
for (let i = 0; i < 25; i++) {
    token += characters[Math.floor(Math.random() * characters.length )];
}


// method : post
// url : api/auth/login
// acces : Public
 const Login =  async (req,res,next) => {
    const {email, password} = req.body
    const user = await User.findOne({email}).lean().populate('role')
    // console.log(user.role[0].name)
    if(!user){
        return next( new apiError('Invalid email/password',400))
    }
   if(await bcrypt.compare(password,user.password) && user && user.status == 'Pending'){
    return next( new apiError("Pending Account. Please Verify Your Email!",401))
   }
   try {
    await bcrypt.compare(password,user.password)

      const token = jwt.sign({ 
          id: user._id,
          email: user.email,
          username:user.username,
          role:user.role[0].name
      }, 
      process.env.JWT_SECRET
      )
      // console.log('Got the token:', token)
      return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ message: "Logged in successfully 😊 👌" });
    
   } catch (error) {
      return(next(apiError('problem in the login , please check your email and password and try again',500)))
   }
   
  }
// method : post
// url : api/auth/register
// acces : Public
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
const VerifyUserMail = (req, res, next) => {
    User.findOne({
      confirmationCode: req.params.confirmationCode,
    })
      .then((user) => {
        if (!user) {
          return next(new apiError('User not found!',404))
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


// method : post
// url : api/auth/forgetpassword
// acces : Public
const ForgetPassword = async (req,res,next) => {
  const {email} = req.body
  let user = await User.findOne({email})
  if(email !== user.email){
    return next(new apiError("User not registered",404))
  }
  // User exist and now create a one time link valid for 10minutes
  const token = jwt.sign({ 
    id: user._id,
    email: user.email,
    username:user.username,
    role:user.role[0].name
}, 
process.env.JWT_SECRET,
{expiresIn:'10m'}
)
  console.log('this is the token :',token)

  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTEwNWQ1NzlhZmE0OGFmMDY4ZTg0OCIsImVtYWlsIjoiYWJvZG9sbGFyLmNhcGdlbWluaUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImJhZHIiLCJpYXQiOjE2NjYyNzQyNDh9.afVwVRhOH6eFQ6QR7Z_Da_dJ0VBAuUDmkbCxtAshY7s"

const link = `http://localhost:8080/api/auth/resetpassword/${token}`
res.send("Password link has been sent t your email...")
nodemailer.sendConfirmationEmail(
         user.username,
         user.email,
         link
  ); 
console.log(link)
}


// method : post
// url : api/auth/resetpassword/:token
// acces : Public
const ResetPassword = async (req,res,next) => {
  const {token} = req.params
    const newpassword = await  req.body
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET)
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

// method : get
// url : api/auth/logout
// acces : private
const LogOut =  (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
};



module.exports = {
    Login,
    Register,
    VerifyUserMail,
    ForgetPassword,
    ResetPassword,
    LogOut,
 
  }