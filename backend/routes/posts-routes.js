const express = require('express')
const { check } = require('express-validator')
const postsControllers = require('../controllers/posts-controllers')
const router = express.Router()


router.get('/:pid', postsControllers.getPostById)
router.get('/user/:uid', postsControllers.getPostByUserId)
router.post('/', 
[
    check('title')
        .not()
        .isEmpty(),
    check('description').isLength({ min: 5 })
],
postsControllers.createPost)
router.delete('/:pid', postsControllers.deletePost)

module.exports = router