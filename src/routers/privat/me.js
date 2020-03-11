const auth = require('../../middleware/auth');
const UserSettings = require('../../models/UserSettings');
const UserData = require('../../models/UserData');
const router = require('express').Router();

// uploads file in memory
// https://github.com/expressjs/multer
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(
      null,
      req.user._id +
        '_' +
        new Date().getMilliseconds() +
        '.' +
        file.originalname.split('.').pop()
    );
  }
});
const upload = multer({ storage });

// const upload = multer({ dest: 'uploads/' });

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// format type to post with axios
const axios = require('axios').default;
const FormData = require('form-data');
const fs = require('fs');

router.get('/', auth, async (req, res) => {
  // Get logged user Profile
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email
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

router.get('/data', auth, async (req, res) => {
  // Get logged user Data
  try {
    const user_id = { user_id: req.user._id };
    let userData = await UserData.findOne(user_id);
    if (!userData) return res.status(400).send("Can't find user");

    res.status(200).json({ userData });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post(
  '/data/save',
  auth,
  upload.single('file'),
  async (req, res, next) => {
    try {
      const update = {
        name: req.body.name,
        employee: {
          active: true,
          title: req.body.employee_title
        }
      };
      const user_id = { user_id: req.user._id };

      if (req.file) {
        const url = 'http://localhost:5000/api/upload';
        const filePath = req.file.path;
        const userAvatar = fs.createReadStream(filePath);
        const form_data = new FormData();
        form_data.append('file', userAvatar);

        const request_config = {
          headers: {
            ...form_data.getHeaders()
          }
        };

        const imgResult = await axios.post(url, form_data, request_config);
        req.body.avatarPath = imgResult.data.fileUrl;

        fs.unlink(filePath, err => {
          if (err) throw new Error('Could not delete ' + filePath);
        });
      }

      const result = await UserData.updateOne(user_id, update);
      return res.status(200).json({ result });
    } catch (error) {
      console.log(error);

      res.status(500).json(error);
    }
  }
);

router.put('/settings/save', auth, async (req, res) => {
  // save logged user Settings
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
