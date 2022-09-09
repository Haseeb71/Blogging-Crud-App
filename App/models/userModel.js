const { string } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    city:String,
    gender:String,
    country:String,
    dob:String,
    cgpa:Number,
    image:String,
    userName:String,
    password:String
})

module.exports = mongoose.model("User",userSchema);