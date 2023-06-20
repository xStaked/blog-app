const catchAsync = require('../utils/catchAsync');
const Post = require('../models/post.model');
const User = require('../models/user.model');
const getAllPosts = catchAsync(async (req, res) => {
    const post = await Post.findAll({
        where: {
            status: 'active',
        },
        attributes: {
            exclude: ['userId', 'status'],
        },
        include: [
            {
                model: User,
                attributes: ['id', 'name', 'profileImgUrl', 'description'],
            },
        ],
        order: [['createdAt', 'DESC']],
        limit: 10,
    });

    res.status(200).json({
        status: 'success',
        results: post.length,
        data: post,
    });
});

const getPost = catchAsync(async (req, res) => {
    const { post } = req;
    res.status(200).json({
        status: 'success',
        data: post,
    });
});

const createPost = catchAsync(async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.sessionUser;
    const post = await Post.create({
        title,
        content,
        userId: id,
    });

    res.status(201).json({
        status: 'success',
        data: post,
    });
});

const updatePost = catchAsync(async (req, res) => {
    const { post } = req;
    const { title, content } = req.body;

    const postUpdated = await post.update({
        title,
        content,
    });

    res.status(200).json({
        status: 'success',
        message: 'Post updated successfully',
        data: postUpdated,
    });
});

const deletePost = catchAsync(async (req, res) => {
    const { post } = req;

    await post.update({
        status: 'disabled',
    });

    res.status(200).json({
        status: 'success',
        message: 'Post deleted successfully',
    });
});

module.exports = {
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
};
