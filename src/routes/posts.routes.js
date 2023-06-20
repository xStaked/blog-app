const express = require('express');
const router = express.Router();

// Controller
const {
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
} = require('../controllers/post.controller');

// Middlewares
const validationMiddleware = require('../middlewares/validations.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const postMiddleware = require('../middlewares/posts.middleware');

// Routes
router
    .route('/')
    .get(getAllPosts)
    .post(validationMiddleware.createPostValidation, authMiddleware.protect, createPost);
router
    .use(authMiddleware.protect)
    .use('/:id', postMiddleware.validPost)
    .route('/:id')
    .get(getPost)
    .patch(
        validationMiddleware.createPostValidation,
        authMiddleware.protectAccountOwner,
        updatePost
    )
    .delete(authMiddleware.protectAccountOwner, deletePost);

module.exports = router;
