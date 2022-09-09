
const User = require("../models/userModel");

const validForm = require("../middlewares/formValidations");
const multer = require("multer");
const flash = require('connect-flash');
const bcrypt = require('bcrypt');
const authUser = require("../middlewares/authentication");
const { findOne } = require("../models/userModel");

const index = async (req,res)=>{
    res.render("login");
};

const home = async (req,res)=>{
    const doc= await User.findById(req.session.userId)
    req.flash('success','Login Succesfully')
     res.render("home",{user:doc});
 };

const store = async(req,res)=>{
   
    var imagefile =  req.file.filename;
    const body = req.body;
    let name = body.name;
     let email = body.email;
     let city = body.city;
     let dob = body.dob;
     let gender = body.gender;
     let country = body.country ;
     let cgpa = body.cgpa ;
     let image = imagefile;
     var newupdate =  {name:name,email:email,city:city,dob:dob,country:country,gender:gender,cgpa,cgpa,image};

     await User.findByIdAndUpdate(req.session.userId, newupdate)

        console.log("Data Saved");
        res.redirect("/store/1");
};

 const show =  async(req,res)=>{
     var perPage = 7
 var page = req.params.page || 1
    
     const user = await User.find({}).skip((perPage * page) - perPage).limit(perPage)
    const count =await User.count()
    const pages =  Math.ceil(count / perPage);
             res.render('store', {
                    total: user,
                    current: page,
                    pages:pages
                });
        };

const edit = async (req,res)=>{
    const doc= await User.findById(req.params.id)
    res.render("edit",{user:doc})
}

const update = async (req,res)=>{
    const body = req.body;
    let name = body.name;
     let email = body.email;
     let city = body.city;
     let dob = body.dob;
     let gender = body.gender;
     let country = body.country ;
     let cgpa = body.cgpa ;
   
    var newupdate =  {name:name,email:email,city:city,dob:dob,country:country,gender:gender,cgpa,cgpa};
    if(req.file){
        let image = req.file.filename ;
        newupdate ={image:image}; 
    }

    const updated = await User.findByIdAndUpdate(req.params.id, newupdate)
     res.redirect("/store/1");
 };

const deleted = async (req,res)=>{
   await User.findByIdAndDelete(req.params.id);
        res.redirect("/store/1");
    };

const userDetails = async (req,res)=>{
    const doc = await User.findById(req.params.id);
    res.render("userDetails",{user:doc})
};

const signUp = async(req,res)=>{
    res.render("signUp",{layout:"./layout/guestLayout"});
};

const signUpPost = async(req,res)=>{
    const body = req.body;
    try {
        const newUser = new User({
            userName : body.userName,
            password :await bcrypt.hash(body.password,10),
            city : "0",
        });
        await newUser.save();
        res.redirect("/login")
    } catch (error) {
       
        res.send("error")
    }
};
const login = async (req,res)=>{
    res.render("login",{layout:"./layout/guestLayout"});
};

const loginPost = async(req,res)=>{
    const body = req.body;
        let userName = body.userName;
        let password = body.password; 
        req.session.user  = await User.findOne({userName:userName});
             if( req.session.user){
        var isMatch = await bcrypt.compare(password,req.session.user.password);
        }
        if(req.session.user && isMatch){
             req.flash('success','Login Succesfully...')
             if(req.session.user.city === "0")
             {
                 res.redirect("/home")   
             }else{
             res.redirect("/store/1")   
             }
        }else{
            req.flash('error','Login Error')
            res.redirect("/login")
        }
};

// function setUser(req,res,next){
//     if(userName){
//       console.log(User.userName);
//       req.user = User.find(user=>User.userName===userName);
//     }
//     next();
//   }


module.exports = {index,store,show,edit,update,deleted,userDetails,login,loginPost,signUp,signUpPost,home};