const express = require('express');

const router = express.Router();

const signUpController = require('../controller/user');

router.post('/signup',signUpController.postAddUser)

module.exports = router ;