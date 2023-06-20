const { body, validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // const error = new Error('Validation failed');
        // error.status = 422;
        // error.errors = errors.array();
        // next(error);
        return res.status(422).json({
            status: 'error',
            errors: errors.mapped(),
        });
    }
    next();
};

exports.createUserValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('description', 'Invalid description').isLength({ min: 10 }),
    // body('role', 'Invalid role').isIn(['admin', 'user']),
    validateResult,
];

exports.loginUserValidation = [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    validateResult,
];

exports.updateUserValidation = [
    body('currentPassword')
        .notEmpty()
        .withMessage('Password cannot be empty')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
    body('newPassword')
        .notEmpty()
        .withMessage('Password cannot be empty')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
    validateResult,
];

exports.createPostValidation = [
    body('title').notEmpty().withMessage('Title cannot be empty'),
    body('content').notEmpty().withMessage('Content cannot be empty'),
    validateResult,
];
