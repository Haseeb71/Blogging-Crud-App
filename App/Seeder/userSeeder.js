const mongoose = require("mongoose");
const faker = require("faker");
const User = require("../models/userModel");
mongoose.connect("mongodb://localhost:27017/CRUD");


async function seedDB(){
    console.log("Seeding Fake Data in Database");
for(let i = 0; i<=50 ; i++){
   
    const newUser = new User({
        userName : faker.name.findName(),
        name : faker.name.findName(),
        city : faker.name.findName(),
        country : faker.name.findName(),
        gender : faker.name.findName(),
         dob : faker.date.future(),
         email : faker.internet.email(),
         cgpa : faker.random.number(0, 4),
         
    });
    await newUser.save();
}};

try {
    seedDB();
} catch (error) {
   // console.log(error);
}