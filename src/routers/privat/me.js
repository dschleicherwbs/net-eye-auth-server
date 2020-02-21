const auth = require('../../middleware/auth');
const UserSettings = require('../../models/UserSettings');
const router = require('express').Router();

router.get('/', auth, async (req, res) => {
  // Get logged user Profile
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    token: req.token
  });
});

router.get('/settings', auth, async (req, res) => {
  // Get logged user Settings
  try {
    const user_id = { user_id: req.user._id };
    let userSettings = await UserSettings.findOne(user_id);
    if (!userSettings) {
      userSettings = new UserSettings(user_id);
      userSettings.save();
    }
    res.status(200).json({ userSettings });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/settings/save', auth, async (req, res) => {
  // Get logged user Settings
  try {
    const update = req.body;
    const user_id = { user_id: req.user._id };
    const result = await UserSettings.updateOne(user_id, update);

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/logout', auth, async (req, res) => {
  // Log user out of device
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token != req.token);
    await req.user.save();
    res.status(200).json('User logged out');
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/logoutall', auth, async (req, res) => {
  // Log user out of ALL devices
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).json('User logged out from all devices');
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/delete', auth, async (req, res) => {
  // Delete user
  try {
    await req.user.delete();
    res.status(200).json('User deleted');
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
