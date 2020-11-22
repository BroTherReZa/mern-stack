const {validationResult} = require('express-validator')
const HttpError = require('../models/http-error')
const User = require('../models/user')

const getUsers = async(req, res, next) => {
    let alluser
    try{
        alluser = await User.find({},'-password')
    }catch(err){
        const error = new HttpError('getting user failed!',500)
        return next(error)
    }
    res.json({ userlist : alluser.map(u=>u.toObject({getters:true}))})
}

const signup = async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) { 
        throw new HttpError('Invalid Username or Password', 422)
    }
    const { name, email, password } = req.body
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
        posts: []
    })
    try {
        await createdUser.save()
    } catch (err) {
        const error = new HttpError('signup faild2.',500)
        console.log(error)
        return next(error)
    }
    res.status(201).json({ user: createdUser.toObject({getters:true})})
}

const login = async (req, res, next) => {
    const { email, password } = req.body
    let existingUser
    try {
        existingUser = await User.findOne({email:email})
    } catch (err) {
        const error = new HttpError('login failed!',500)
        return next(error)
    }
    if(!existingUser){
        const error = new HttpError('invalid input',401)
        return next(error)
    }
    res.json({ message: ' logged in ', user: existingUser.toObject({getters:true})})
}

exports.getUsers = getUsers
exports.signup = signup
exports.login = login