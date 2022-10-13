// method : post
// url : api/auth/login
// acces : Public
 const Login =  (req,res) => {
    res.status(200).send(req.body)
}

// Re
const Register =  (req,res) => {
    res.status(200).send('this a register function')
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