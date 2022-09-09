const express = require("express");


function authUser(req,res,next){
   //console.log(req.session.user);
 // console.log(req.session.userId);
 
    if(req.session.user == null){
        req.flash('error','Login first!');
        res.redirect("/login");
       
    } else{
        req.session.userId = req.session.user._id;
        next();
    }
}

module.exports = authUser; 