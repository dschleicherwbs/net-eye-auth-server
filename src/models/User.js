const mongoose = require('mongoose');
const UserSettings = require('./UserSettings');
const UserData = require('./UserData');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: 'Invalid Email address' });
      }
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 3
  },
  tokens: [{ token: { type: String, required: true } }]
});

userSchema.pre('save', async function(next) {
  // Hash password before save
  const user = this;
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

userSchema.pre('remove', async function(next) {
  const user = this;

  // remove user settings
  const settingsResult = await UserSettings.deleteMany({ user_id: user._id });
  // remove user data
  const dataResult = await UserData.deleteMany({ user_id: user._id });

  next();
});

userSchema.methods.generateAuthToken = async function() {
  // Generate auth token
  const user = this;
  const key = process.env.JWT_KEY;
  const token = jwt.sign({ _id: user.id }, key);

  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  // Search for user
  const errMsg = 'Invalid Username or Password';
  const user = await User.findOne({ email }).exec();
  if (!user) {
    throw new Error({ error: errMsg });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error({ error: errMsg });
  }
  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
