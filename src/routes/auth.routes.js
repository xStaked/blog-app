const authController = require('../controllers/auth.controller');
const express = require('express');

// Middlewares
const validationsMiddleware = require('../middlewares/validations.middleware');
const usersMiddleware = require('../middlewares/users.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/signup', validationsMiddleware.createUserValidation, authController.signUp);
router.post('/login', validationsMiddleware.loginUserValidation, authController.login);

router.use(authMiddleware.protect);
router.get('/renew', authController.renewToken);
router.patch(
    '/password/:id',
    validationsMiddleware.updateUserValidation,
    usersMiddleware.validUser,
    authMiddleware.protectAccountOwner,
    authController.updatePassword
);
module.exports = router;
