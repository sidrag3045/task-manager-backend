const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const { User } = require('../models');

// User registration
const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }
  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
// now in the above we are generating a token and sending it back to the client so that the user once registers, successfully gets logged in too in that very session.


// Getting user details
const getMe = async (req, res) => {
    const { id, name, email } = req.user;
    res.json({ id, name, email });
};

// Updating user details
const updateMe = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (name)  req.user.name = name;
        if (email) req.user.email = email;
        if (password) {
        req.user.passwordHash = await bcrypt.hash(password, 10);
        }
        await req.user.save();
        const { id } = req.user;
        res.json({ id, name: req.user.name, email: req.user.email });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
  
// User login
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  
      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

// Exporting all handlers at once
module.exports = {
  signup,
  getMe,
  updateMe,
  login
};