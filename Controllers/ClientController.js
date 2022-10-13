// method : GET
// url : api/client/me
// acces : Private
const GetUserClient =  (req,res) => {
    res.status(200).send('Bonjour Anass, votre rôle est : Client')
}


module.exports = {

    GetUserClient
}