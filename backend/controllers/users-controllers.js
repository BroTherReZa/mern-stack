const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
    let hashedPassword
    try {
        hashedPassword = await bcrypt.hash(password, 12)
    } catch (err) {
        const error = new HttpError('could not create user.',500)
        return next(error)
    }
    const createdUser = new User({
        name:name,
        email:email,
        password:hashedPassword,
        image: req.file.path,
        posts: []
    })
    try {
        await createdUser.save()
    } catch (err) {
        const error = new HttpError('signup faild2.',500)
        return next(error)
    }
    let token
    try {
        token = jwt.sign(
            {userId: createdUser.id, email:createdUser.email},
            'BroTher_Secret_Key',
            {expiresIn: '1h'}
        )
    } catch (err) {
        const error = new HttpError('signup faild2.',500)
        return next(error)
    }

    res.status(201).json({
        userId : createdUser.id,
        email: createdUser.email,
        token: token
    })
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
    let isValidPassword = false
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password)
    } catch (err) {
        const error = new HttpError('could not login',500)
        return next(error)
    }
    if(!isValidPassword){
        const error = new HttpError('invalid input',401)
        return next(error)
    }

    let token
    try {
        token = jwt.sign(
            {userId: existingUser.id, email:existingUser.email},
            'BroTher_Secret_Key',
            {expiresIn: '1h'}
        )
    } catch (err) {
        const error = new HttpError('signup faild2.',500)
        return next(error)
    }

    res.json({
        userId: existingUser.id,
        email: existingUser.email,
        token: token
    })
}

exports.getUsers = getUsers
exports.signup = signup
exports.login = login