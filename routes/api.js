const express = require('express');
const router = express.Router();
const User = require('../models/user');
const signup = require('../controllers/signup');
const signIn = require('../controllers/login');
const verifyAuth = require('../middlewares/verifyAuth');
const verifySignup = require('../middlewares/verifySignup')

router.post("/login", [verifyAuth.verifyAuth], signIn.signIn);

router.post("/signup", [verifyAuth.verifyAuth,verifySignup.checkDuplicateEmail], signup.signUp);

module.exports = router;