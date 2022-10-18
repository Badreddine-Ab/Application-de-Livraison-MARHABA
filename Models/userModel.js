const mongoose = require("mongoose")

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UserSchema = new mongoose.Schema({
    username : {type: String, required: true, unique:true},
    email: {type: String,
        trim: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password : {type: String, required:true},
    role: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "roles"
        }
      ]
},
{ collection: 'users'}
)

const user = mongoose.model('UserShema', UserSchema)


module.exports = user