const Joi = require('joi');

const userValidation = (user) => {

    const validationSchema = Joi.object({
        firstname: Joi.string().min(2).max(75).required(),
        lastname: Joi.string().min(2).max(75).required(),
        email: Joi.string().min(3).max(255).email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string().min(8).max(255).required()

    })

    return validationSchema.validate(user)
}

module.exports = userValidation;