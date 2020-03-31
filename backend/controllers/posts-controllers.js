const uuid = require('uuid/v4')
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')

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

const getPostById = (req, res, next) => {
    const postId = req.params.pid
    const post = posts.find( p => {
        return p.id === postId
    })
    if(!post) {
        return next(
            new HttpError('Not Found!', 404)
        )
    }
    res.json({ postsList : post })
}
const getPostByUserId = (req, res, next) => {
    const userId = req.params.uid
    const userPosts = posts.filter(post => post.creator === userId)
    if(userPosts.length === 0) {
        return next(
            new HttpError('', 404)
        )
    }
    res.json({ postsList : userPosts })
}

const createPost = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        throw new HttpError('Invalid Inputs', 422)
    }
    const {title, description, creator} = req.body
    const createdPost = {
        id: uuid(),
        title : title,
        description : description,
        creator : creator
    }
    posts.push(createdPost)
    res.status(201).json({postsList: createdPost})
}

const deletePost = (req, res, next) => {
    const postId = req.params.pid
    loadedPosts = posts.filter( p => p.id !== postId)
    res.status(200).json({ message: 'Post Deleted!'})
}

exports.getPostById = getPostById
exports.getPostByUserId = getPostByUserId
exports.createPost = createPost
exports.deletePost = deletePost