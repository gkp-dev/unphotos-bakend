const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json('Acces denied. No token provided')

    try {
        const decoded = jwt.verify(token, process.env.JWT_Private_Key);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).json('Invalid token..')
    }

}

module.exports = auth;