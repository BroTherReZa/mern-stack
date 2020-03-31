const express = require('express')
const postsControllers = require('../controllers/posts-controllers')
const router = express.Router()


router.get('/:pid', postsControllers.getPostById)
router.get('/user/:uid', postsControllers.getPostByUserId)
router.post('/', postsControllers.createPost)

module.exports = router