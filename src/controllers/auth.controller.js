const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const { generateToken } = require('../utils/jwt');
const AppError = require('../utils/appError');
exports.signUp = catchAsync(async (req, res) => {
    const { name, email, password, description } = req.body;
    // times to hash the password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name: name.toLowerCase(),
        email: email.toLowerCase(),
        password: hashedPassword,
        description,
    });

    const token = await generateToken(user.id);

    return res.status(200).json({
        status: 'success',
        message: 'User created successfully',
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            description: user.description,
            profileImgUrl: user.profileImgUrl,
            role: user.role,
        },
    });
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({
        where: {
            email: email.toLowerCase(),
            status: 'active',
        },
    });

    if (!user) {
        return next(new AppError('Invalid email or password', 404));
    }

    if (!(await bcrypt.compare(password, user.password))) {
        return next(new AppError('Invalid email or password', 400));
    }

    const token = await generateToken(user.id);

    return res.status(200).json({
        status: 'success',
        message: 'User logged in successfully',
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            description: user.description,
            profileImgUrl: user.profileImgUrl,
            role: user.role,
        },
    });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
    const { user } = req;
    const { currentPassword, newPassword } = req.body;

    if (!(await bcrypt.compare(currentPassword, user.password))) {
        return next(new AppError('Incorrect password', 401));
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await user.update({
        password: hashedPassword,
        passwordChangedAt: new Date(),
    });

    return res.status(200).json({
        status: 'success',
        message: 'Password updated successfully',
    });
});

exports.renewToken = catchAsync(async (req, res, next) => {
    const { id } = req.sessionUser;

    const user = await User.findOne({
        where: {
            id,
            status: 'active',
        },
    });

    const token = await generateToken(id);

    return res.status(200).json({
        status: 'success',
        message: 'User logged in successfully',
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            description: user.description,
            profileImgUrl: user.profileImgUrl,
            role: user.role,
        },
    });
});
