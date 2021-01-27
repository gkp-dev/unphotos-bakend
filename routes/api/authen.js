const { Router } = require('express');
const bcrypt = require('bcrypt');
const router = Router();

const authValidation = require('../../validation/authValidation');
const User = require('../../model/users');



//Authenticate a user
router.post('/', async(req, res) => {

    //Validation of user input
    const { error } = authValidation(req.body)
    if (error) return res.status(400).json(error.details[0].message)

    //Get user input
    const { email } = req.body
    let { password } = req.body;

    //Email is registered?
    const user = await User.findOne({ email: email })
    if (!user) return res.status(400).json("Invalid email or password... ")

    //Compare mot de passe
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) return res.status(400).json("Invalid email  or password...")

    //Send the token to the client
    const token = await user.generateAuthToken()

    //Send the jwt in the header to the client
    res.header('x-auth-token', token).json({ token: token, _id: user._id, firstname: user.firstname, lastname: user.lastname, email: user.email })
})


module.exports = router;