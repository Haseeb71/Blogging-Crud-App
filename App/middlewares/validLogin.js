const Joi = require("joi");


const loginValidation = function(req, res, next) {

    const schema = Joi.object({
        userName:Joi.string().min(5).max(12).required(),
        password:Joi.string().min(5).max(12).required(),
    })
    // schema options
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    // validate request body against schema
    const { error, value } = schema.validate(req.body, options);
    
    if (error) {
        req.flash('error',error.details[0].message);
        return res.redirect("login");
        
    } else {
        next();
    };
};
 module.exports = loginValidation; 
    
    

