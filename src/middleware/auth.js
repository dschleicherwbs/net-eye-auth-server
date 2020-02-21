const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const key = process.env.JWT_KEY;
    const data = await jwt.verify(token, key);

    const user = await User.findOne({
      _id: data._id,
      'tokens.token': token
    }).exec();
    if (!user) {
      throw new Error('Invalid session');
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Not authorized to access this resource' });
  }
};

module.exports = auth;
