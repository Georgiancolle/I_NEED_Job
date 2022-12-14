const mongoose=require('mongoose')
const passportLocalMongoose=require('passport-local-mongoose')

const userSchema=new mongoose.Schema({
    username: String,
    password: String
})
//make the useer model extend or inherit from PLM so it gets all the auth methods/propertes
userSchema.plugin(passportLocalMongoose)

module.exports=mongoose.model('User', userSchema)