const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Authority = require('../models/authority');

exports.authoritiesLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const authority = await Authority.findOne({ email });

    if (!authority) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, authority.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: authority._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};