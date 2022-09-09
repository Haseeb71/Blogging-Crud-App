const express = require("express");
const { appendFile } = require("fs");
const multer = require("multer");
const path = require("path");
const Joi = require("joi");
const router = express.Router();
const userController = require("../controller/userController");
const validForm = require("../middlewares/formValidations");
const validLogin = require("../middlewares/validLogin");
const authUser = require("../middlewares/authentication");

// MULTER 
const storage = multer.diskStorage({
   destination:(req,file,cb)=>{
      cb(null,'public/images')
   },
   filename:(req,file,cb)=>{
      //console.log(file);
      cb(null,Date.now()+file.originalname);
   }
});
const upload = multer ({storage:storage});





//Routes
router.get("/",authUser,userController.index);
router.get("/home",authUser,userController.home);
router.post("/home",upload.single("image"),validForm,userController.store);
router.get("/store/:page",userController.show);
router.get("/edit/:id",authUser,userController.edit);
router.post("/edit/:id",upload.single("image"),userController.update);
router.get("/delete/:id",authUser,userController.deleted);
router.get("/users/:id",authUser,userController.userDetails);

router.get("/login",userController.login);
router.post("/login",userController.loginPost);
router.get("/signUp",userController.signUp);
router.post("/signUp",validLogin,userController.signUpPost);

module.exports = router;
