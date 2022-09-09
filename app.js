var express = require("express"),
mongoose = require("mongoose"),
bodyparser = require("body-parser"),
methodOverride = require("method-override"),
multer = require("multer"),
Joi = require('joi'),
flash = require('connect-flash'),
cookieParser = require("cookie-parser"),
session = require("express-session"),
User = require("./App/models/userModel"),
User = require("./App/models/adminsModel"),
path = require("path"),
bcrypt = require('bcrypt'),
form = require("./App/middlewares/formValidations"),
passport = require("passport"),
layouts = require("express-ejs-layouts"),
LocalStrategy = require('passport-local').Strategy,
fs = require("fs"),
app = express();
const port = process.env.PORT || 3000
mongoose.connect("mongodb://localhost:27017/CRUD");


app.use(express.static(path.join(__dirname,'public'))); 
app.use(layouts);
app.set("layout","./layout/main");

// For Flash messages
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 24 * 60 * 60 * 1000 },
  }));

  app.use(flash());
app.use(function(req, res, next) {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})

// Configure middle wares
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(require("./App/routes/index.js"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(cookieParser('SecretStringForCookeis'));
app.use(passport.initialize()); 
app.use(passport.session());


app.listen(port,()=>{
    console.log(`Port is Running at http://localhost:${port}`);
})

module.exports = app;