const express = require('express');
const { signup, signin, signout } = require('../controller/auth');
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
} = require('../validators/auth');
const router = express.Router();

//First request goes through validation only then to the controller function
router.post('/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/signin', validateSigninRequest, isRequestValidated, signin);

router.post('/signout', signout);

module.exports = router;
