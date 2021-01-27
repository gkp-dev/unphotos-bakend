const { Router } = require('express');
const router = Router();
const users = require('./users');
const authentification = require('./authen')

router.use('/users', users);
router.use('/auth', authentification)




module.exports = router;