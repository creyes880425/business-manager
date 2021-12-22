const jwt = require('jsonwebtoken');

const secret = "6f048bb0-9ede-4201-8e00-07aee4c519fb"
module.exports.secret = secret;

module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
        if(err) {
            res.status(401).json({ok: false, message:'Usuario no válido'})
        } else {
            next();
        }
    })
}