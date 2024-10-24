const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type :String,
        required:[true,"Please enter username"],
    },
    email: { 
        type:String,
        required:[true,"Please enter email"],
        unique:[true,"Email already exists"],
    },
    password: {
        type:String,
        required:[true,"Plea//@route POST se enter password"],
    },
},{
    timestamps:true,
}
);

module.exports = mongoose.model('User',userSchema);