const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname:{
        type:String,
    },
    username:{
        type:String,
        required:true
    },
    status:{
        type:String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        defualt: 
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    }
}, { timestamps: true })

userSchema.methods.comparePassword = async function(passwordEntered){
    return await bcrypt.compare(passwordEntered,this.password)
}

userSchema.pre('save',async function(next){
    if(!this.isModified) next()
    this.password = await bcrypt.hash(this.password,10)
})

module.exports = mongoose.model("User", userSchema)