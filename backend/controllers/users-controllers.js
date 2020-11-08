const uuid = require('uuid/v4')
const {validationResult} = require('express-validator')
const HttpError = require('../models/http-error')
const User = require('../models/user')


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

const signup = async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        throw new HttpError('Invalid Username or Password', 422)
    }
    const { name, email, password, posts } = req.body
    let existingUser
    try {
        existingUser = await User.findOne({email:email})
    } catch (err) {
        const error = new HttpError('signup faild.',500)
        return next(error)
    }
    if(existingUser){
        const error = new HttpError('user exist.',422)
        return next(error)
    }
    const createdUser = new User({
        name:name,
        email:email,
        password:password,
        image: 'url',
        posts: posts
    })
    try {
        await createdUser.save()
    } catch (err) {
        const error = new HttpError('signup faild.',500)
        return next(error)
    }
    res.status(201).json({ user: createdUser.toObject({getters:true})})

    /*
    const createdUser = {
        id: uuid(),
        name: name,
        email: email,
        password: password
    }
    users.push(createdUser)
    res.status(201).json({ userList: createdUser })
    */
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