const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../user/User');
const verifyToken = require('./VerifyToken');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Register new user
router.post('/register', (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  }, (err, user) => {
    if (err) {
      res.status(500).json({error: 'There was an error creating the user'});
    }
    // Create new token to authenticate user
    const token = jwt.sign(
      {id: user._id}, process.env.secret, { expiresIn: 86400 }
    );
    res.status(200).json({ auth: true, token });
  });
});

// Get user
router.get('/me', verifyToken, (req, res) => {
  User.findById(req.userId, { password: 0 }, (err, user) => {
    if (err) {
      res.status(500).json({ auth: false, message: 'There was an error finding user.' });
    }
    if (!user) {
      res.status(404).json({ auth: false, message: 'User not found'});
    }
    res.status(200).json({ auth: true, user });
  });
});

// Login 
router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      res.status(404).json({ auth: false, message: 'User not found' });
    }
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      res.status(401).json({ auth: false, message: 'wrong password'});
    }
    const token = jwt.sign({ id: user._id }, process.env.secret, { expiresIn: 86400 });
    res.status(200).json({ auth: true, token });
  });
});

// Logout
router.get('/logout', (req, res) => {
  res.status(200).send({ auth: false, token: null });
});

module.exports = router;
