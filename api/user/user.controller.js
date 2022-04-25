require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./user.model');

async function createUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).json({ error: 'username and password are required' });
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      res.status(409).json({ error: 'User Already Exist. Please Login' });
    } else {
      await User.create({ email, password });
      res.status(201).json({ success: true });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).json({ error: 'All input are required' });
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        // eslint-disable-next-line no-underscore-dangle
        { userId: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: '2h',
        }
      );

      user.token = token;

      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: 'Invalid Credentials' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

module.exports = {
  createUser,
  loginUser,
};
