const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    const allUsers = await User.find().exec();
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post('/register', async (req, res) => {
  // Creates a new User
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).json({ user: { _id: user._id }, token });
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

router.get('/me', auth, (req, res) => {
  // Get logged user Profile
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    token: req.token
  });
});

router.post('/me/logout', auth, async (req, res) => {
  // Log user out of device
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token != req.token);
    await req.user.save();
    res.status(200).json('User logged out');
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/me/logoutall', auth, async (req, res) => {
  // Log user out of ALL devices
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).json('User logged out from all devices');
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/me/delete', auth, async (req, res) => {
  // Delete user
  try {
    await req.user.delete();
    res.status(200).json('User deleted');
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
