const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const shortid = require('shortid');

//token generated when user signs in
//token expires in one day
const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

exports.signup = (req, res) => {
  //If user with same email already exists, error returned
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        error: 'User already registered',
      });

    const { fullName, email, password } = req.body;

    //hash password generated with bcrypt
    const hash_password = await bcrypt.hash(password, 10);
    const _user = new User({
      fullName,
      email,
      hash_password,
      username: shortid.generate(), //random user id generated
    });

    //new user saved in database
    _user.save((error, user) => {
      if (error) {
        return res.status(400).json({
          message: 'Something went wrong',
        });
      }

      //user added in database successfully
      if (user) {
        const { _id, fullName, email, role } = user;
        return res.status(201).json({
          user: { _id, fullName, email, role },
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  //finding user with email in request
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      //confirming password
      const isPassword = await user.authenticate(req.body.password);
      if (isPassword && user.role === 'user') {
        //token generated if details match
        //token will be stored in local storage(session formed), it will expire in one day
        const token = generateJwtToken(user._id, user.role);
        const { _id, fullName, email, role, createdAt } = user;
        res.status(200).json({
          token,
          user: { _id, fullName, email, role, createdAt },
        });
      } else {
        return res.status(400).json({
          message: 'Wrong email or password',
        });
      }
    } else {
      return res.status(400).json({ message: 'Wrong email or password' });
    }
  });
};

exports.signout = (req, res) => {
  //token cleared
  res.clearCookie('token');
  res.status(200).json({
    message: 'Signout successful',
  });
};
