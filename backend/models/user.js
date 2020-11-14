const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true, minlength: true},
    image: {type: String, required: true},
    posts: [{type: mongoose.Types.ObjectId, required: true, ref: 'Post'}]
})
module.exports = mongoose.model('User', userSchema)