const mongoose = require("mongoose")

const RoleSchema = new mongoose.Schema({
    title:{type:String},
    
},{ collection: 'roles'})


const role = mongoose.model('RoleSchema',RoleSchema)

module.exports = role