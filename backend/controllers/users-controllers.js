const uuid = require('uuid/v4')
const {validationResult} = require('express-validator')
const HttpError = require('../models/http-error')


let users =[{
        id:'u1',
        name:'مریم',
        email:'m@b.com',
        password: '123'
    },{
        id:'u2',
        name:'رضا',
        email:'b@b.com',
        password: '1234'
    }]

const getUsers = (req, res, next) => {
    res.json({ userList : users})
}

const signup = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        throw new HttpError('Invalid Username or Password', 422)
    }
    const { name, email, password } = req.body
    const createdUser = {
        id: uuid(),
        name: name,
        email: email,
        password: password
    }
    users.push(createdUser)
    res.status(201).json({ userList: createdUser })
}

const login = (req, res, next) => {
    const { email, password } = req.body
    const validUser = users.find( user => user.email === email )
    if(!validUser || validUser.password !== password ) {
        throw new HttpError('Not a valid user!' , 401)
    }
    res.json({ message: ' logged in '})

    
}

exports.getUsers = getUsers
exports.signup = signup
exports.login = login