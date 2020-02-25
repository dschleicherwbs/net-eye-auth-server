const User = require('../models/User');
const UserSettings = require('../models/UserSettings');
const UserData = require('../models/UserData');

const router = require('express').Router();

router.post('/register', async (req, res) => {
  // Creates a new User
  try {
    // Create User
    const user = new User(req.body);
    await user.save();

    // Create UserSettings
    const userSettings = new UserSettings({ user_id: user._id });
    await userSettings.save();

    // Create UserData
    const userData = new UserData({
      user_id: user._id,
      name: req.body.name
    });
    await userData.save();

    res.status(201).json({ user: { _id: user._id } });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/login', async (req, res) => {
  // Login User
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res.status(401).json({ error: 'Password or Username are wrong!' });
    }
    const token = await user.generateAuthToken();
    res.json({ user: { _id: user._id }, token });
  } catch (error) {
    res.status(400).json(error);
  }
});

// ADMIN LOGIN REGIST DEV
// ADMIN LOGIN REGIST DEV
// ADMIN LOGIN REGIST DEV
// ADMIN LOGIN REGIST DEV
// ADMIN LOGIN REGIST DEV
// ADMIN LOGIN REGIST DEV
// ADMIN LOGIN REGIST DEV
// ADMIN LOGIN REGIST DEV
// ADMIN LOGIN REGIST DEV

router.get('/', async (req, res) => {
  try {
    const allUsers = await User.find().exec();
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get('/deleteall', async (req, res) => {
  try {
    const result = await User.deleteMany().exec();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete('/delete', async (req, res) => {
  // Login User
  try {
    const id = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(401).json({ error: 'Can not find User!' });
    }
    const result = await user.delete();
    res.status(200).json({ result });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get('/me/settings/all', async (req, res) => {
  // Get logged user Settings
  try {
    const userSettings = await UserSettings.find();
    res.status(200).json({ userSettings });
  } catch (error) {
    res.status(500).json(error);
  }
});
router.post('/me/settings/deleteall', async (req, res) => {
  // Get logged user Settings
  try {
    const userSettings = await UserSettings.deleteMany();
    res.status(200).json({ userSettings });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
