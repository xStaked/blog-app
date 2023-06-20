const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
exports.findAllUsers = catchAsync(async (req, res) => {
    const users = await User.findAll({
        where: {
            status: 'active',
        },
    });

    if (users.length === 0) {
        return new AppError('No users found', 404);
    }

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: users,
    });
});
exports.findOneUser = catchAsync(async (req, res) => {
    const { user } = req;
    res.status(200).json({
        status: 'success',
        data: user,
    });
});
exports.updateUser = catchAsync(async (req, res) => {
    const { user } = req;
    const { name, description } = req.body;

    await user.update({
        name,
        description,
    });

    res.status(200).json({
        status: 'success',
        message: 'User updated successfully',
    });
});
exports.deleteUser = catchAsync(async (req, res) => {
    const { user } = req;

    await user.update({
        status: 'disabled',
    });

    res.status(200).json({
        status: 'success',
        message: 'User deleted successfully',
    });
});
