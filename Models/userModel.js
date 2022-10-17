const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username : {type: String, required: true, unique:true},
    password : {type: String, required:true}
},
{ collection: 'users'}
)

const model = mongoose.model('UserShema', UserSchema)

module.exports = model