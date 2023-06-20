const AppError = require('../utils/appError');
const logger = require('../utils/logger');
const handleCastError23505 = () => {
    return new AppError('Duplicate field value: please use another value', 400);
};

const handleJWTExpiredError = () => {
    return new AppError('Your token has expired! Please log in again', 401);
};

const handleJWTError = () => {
    return new AppError('Invalid token. Please log in again', 401);
};

const sendErrorDev = (err, res) => {
    logger.info(err); // not necessary
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const sendErrorProd = (err, res) => {
    logger.error(err);

    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!',
        });
    }
};

const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    }

    if (process.env.NODE_ENV === 'production') {
        let error = err;
        if (error.parent?.code === '23505') error = handleCastError23505();
        if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
        if (error.name === 'JsonWebTokenError') error = handleJWTError();
        sendErrorProd(error, res);
    }
};

module.exports = globalErrorHandler;
