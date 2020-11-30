const HttpError = require("../models/http-error")
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    if(req.method === 'OPTIONS'){
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1] // 'Bearer TOKEN'
        if(!token){
            throw new HttpError('Auth failed.' )
        }
        const decodedToken = jwt.verify(token, 'BroTher_Secret_Key')
        req.userData = {userId: decodedToken.userId }
        next()
    } catch (err) {
        const error = new HttpError('Auth failed.', 401)
            return next(error)
    }
}