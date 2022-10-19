
const User = require('../Models/userModel')
const bcrypt = require('bcryptjs')
const apiError = require('../Utils/apiError')
const { response } = require('express')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'jlhfzmkugfajgfauig'
const Role = require('../Models/roleModel')
const nodemailer = require('../Config/nodemailer.config')

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

      nodemailer.sendConfirmationEmail(
         user.username,
         user.email,
         user.confirmationCode
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
    VerifyUser,
    ForgetPassword,
    ResetPassword
}