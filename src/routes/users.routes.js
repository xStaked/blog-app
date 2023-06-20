const express = require('express');
const router = express.Router();

const userController = require('../controllers/users.controller');
const userMiddleware = require('../middlewares/users.middleware');

router.get('/', userController.findAllUsers);

router
    .route('/:id')
    .get(userMiddleware.validUser, userController.findOneUser)
    .patch(userMiddleware.validUser, userController.updateUser)
    .delete(userMiddleware.validUser, userController.deleteUser);
module.exports = router;
