const Joi = require('joi');

const authValidation = (user) => {

    const validationSchema = Joi.object({
        email: Joi.string().min(3).max(255).email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string().min(8).max(255).required()

    })

    return validationSchema.validate(user)
}

module.exports = authValidation;