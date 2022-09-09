const Joi = require("joi");


const formValidation = function(req, res, next) {

    const schema = Joi.object({
        name:Joi.string().required(),
        email:Joi.string().email().required(),
        dob:Joi.date().required(),
        city:Joi.string().required(),
        country:Joi.string().required(),
        gender:Joi.string().required(),
        cgpa:Joi.string().required(),
        image:Joi.string().optional(),
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
        return res.redirect("home");
        
    } else {
        next();
    };
};
 module.exports = formValidation; 
    
    

