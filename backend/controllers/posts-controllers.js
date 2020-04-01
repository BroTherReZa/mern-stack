const uuid = require('uuid/v4')
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const Post = require('../models/post')

let posts=[{
    id:'p1',
    title:'post 1',
    description:'post 1 description ... ',
    creator:'u1'
    },{
    id:'p2',
    title:'post 2',
    description:'post 2 description ... ',
    creator:'u2'
    },{
    id:'p3',
    title:'post 3',
    description:'post 3 description ... ',
    creator:'u2'
    }]

const getPostById = async (req, res, next) => {
    const postId = req.params.pid
    let post
    try{
        post = await Post.findById(postId)
    }catch(err) {
        const error = new HttpError('Could not find a post!', 500)
        return next(error)
    }
    if(!post) {
        const error = new HttpError('Could not find a post!', 500)
        return next(error)
    }
    res.json({ postsList : post.toObject({getters:true})})
}
const getPostByUserId = async (req, res, next) => {
    const userId = req.params.uid
    let posts
    try{
        posts = await Post.find({ creator: userId })
    } catch(err) {
        const error = new HttpError('Could not find any post!', 500)
        return next(error)
    }
    if(!posts) {
        const error = new HttpError('Could not find any post!', 500)
        return next(error)
    }
    res.json({ postsList : posts.map( post => post.toObject({getters:true}))})
}

const createPost = async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        throw new HttpError('Invalid Inputs', 422)
    }
    const {title, description, creator} = req.body

    const createdPost = new Post({
        title: title,
        description: description,
        image: 'url',
        creator: creator
    })
    try{
        await createdPost.save()
    }catch(err){
        const error = new HttpError('creating Post Failed!', 500)
        return next(error)
    }
    res.status(201).json({postsList: createdPost})
}

const deletePost = async(req, res, next) => {
    const postId = req.params.pid
    let post
    try{
        post = await Post.findById(postId)
    } catch(err) {
        const error = new HttpError('Could not delete a post!', 500)
        return next(error)
    }
    try{
        await Post.remove()
    } catch(err) {
        const error = new HttpError('Could not delete a post!', 500)
        return next(error)
    }
    res.status(200).json({ message: 'Post Deleted!'})
}

exports.getPostById = getPostById
exports.getPostByUserId = getPostByUserId
exports.createPost = createPost
exports.deletePost = deletePost