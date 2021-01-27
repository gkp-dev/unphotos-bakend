const { Router } = require('express');
const bcrypt = require('bcrypt');
const router = Router();

const userValidation = require('../../validation/userValidation');
const authori = require('../../middleware/autho');
const User = require('../../model/users');


//Get a specific user
router.get('/me', authori, async(req, res) => {
    const user = await User.findById({ _id: req.user._id })
        .select('-password')
    res.json({ _id: user._id, email: user.email })
})

//Create a user
router.post('/', async(req, res) => {
    //Validation of user input
    const { error } = userValidation(req.body)
    if (error) return res.status(400).json(error.details[0].message)

    //Get user input
    const { firstname, lastname, email } = req.body
    let { password } = req.body;

    //The user already register?
    let user = await User.findOne({ email: email })
    if (user) return res.status(400).json('This user already exists...')

    //Hashing the password
    password = await bcrypt.hash(password, 10);

    //Create a new user
    user = await new User({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password
    })
    await user.save()

    //Generate jwt
    const token = await user.generateAuthToken()

    //Send the jwt in the header to the client
    res.header('x-auth-token', token).json({ token: token, _id: user._id, firstname: user.firstname, lastname: user.lastname, email: user.email })
})

module.exports = router;