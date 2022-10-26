// method : GET
// url : api/manager/me
// acces : Private
const GetUserManger =  (req,res) => {
    res.status(200).send('Bonjour Anass, votre rôle est : manager')
}


module.exports = {
    GetUserManger
}