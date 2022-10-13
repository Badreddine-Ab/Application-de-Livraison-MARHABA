// method : GET
// url : api/livreure/me
// acces : Private
const GetUserLivreure =  (req,res) => {
    res.status(200).send('Bonjour Anass, votre rôle est : Livreure')
}


module.exports = {
    GetUserLivreure
}