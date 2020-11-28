const express = require('express')
const { check } = require('express-validator')
const postsControllers = require('../controllers/posts-controllers')
const fileUpload = require('../middleware/file-upload')
const router = express.Router()


router.get('/:pid', postsControllers.getPostById)
router.get('/user/:uid', postsControllers.getPostByUserId)
router.post('/', 
fileUpload.single('image'), 
[
    check('title')
        .not()
        .isEmpty(),
    check('description').isLength({ min: 5 }),
    check('creator')
        .not()
        .isEmpty()
],
postsControllers.createPost)
router.delete('/:pid', postsControllers.deletePost)

module.exports = router