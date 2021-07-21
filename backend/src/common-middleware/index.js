const jwt = require('jsonwebtoken');

//ensures whether user is still signed in or not
//Eg token could have expired and user could still perform actions, which cannot be allowed
exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } else {
    return res.status(400).json({ error: 'Authorization required' });
  }
  next();
  //jwt.decode()
};

//Checks whether  role is 'user' otherwise error returned
exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== 'user') {
    return res.status(400).json({ error: 'User access denied' });
  }
  next();
};

//Checks whether user role is 'admin' otherwise error returned(for admin-app)
exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(400).json({ error: 'Admin access denied' });
  }
  next();
};
