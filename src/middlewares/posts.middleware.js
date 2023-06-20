const Post = require('../models/post.model');
const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validPost = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const post = await Post.findOne({
        where: {
            id,
            status: 'active',
        },
        include: [
            {
                model: User,
            },
        ],
    });

    if (!post) next(new AppError('Post not found', 404));

    req.user = post.user;
    req.post = post;
    next();
});
