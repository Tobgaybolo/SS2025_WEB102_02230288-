const express = require('express');
const {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
} = require('../controllers/postController');

const router = express.Router();

router.route('/').get(getPosts).post(createPost);

router.route('/:id').get(getPost).put(updatePost).delete(deleteUser);

module.exports = router;