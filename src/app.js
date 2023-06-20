const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');
const authRoutes = require('./routes/auth.routes');
const usersRoutes = require('./routes/users.routes');
const postsRoutes = require('./routes/posts.routes');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');
const sanitizer = require('perfect-express-sanitizer');

const app = express();

const limiter = rateLimit({
    max: 100000,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour',
});

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(
    sanitizer.clean({
        xss: true,
        noSQL: true,
        sql: true,
    })
);

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/v1', limiter);

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/posts', postsRoutes);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
