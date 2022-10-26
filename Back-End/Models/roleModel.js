const mongoose = require("mongoose")

const RoleSchema = new mongoose.Schema({
    title:{type:String},
    
},{ collection: 'roles'})


const role = mongoose.model('role',RoleSchema)

module.exports = role