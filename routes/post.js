const express = require('express')
const router = express.Router()

const {
    getAllPosts,
    getSinglePost,
    createPost,
    updatePost,
    deletePost,
    imagePost
} = require('../controllers/postController')

router.get('/', getAllPosts)
router.get('/post/:id', getSinglePost)
router.post('/post', createPost)
router.put('/post/:id', updatePost)
router.delete('/post/:id', deletePost)
router.post('/post/imageUpload/:id', imagePost)

module.exports = router;