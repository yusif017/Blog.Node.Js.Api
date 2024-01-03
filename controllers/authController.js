const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.registerUser = async (req, res) => {
  try {
    const { email, password, firstname, lastname } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      firstname,
      lastname, 
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email:email });
    const userProfile = {
      userId: user._id,
      email: user.email,
      lastname: user.lastname,
      firstname: user.firstname,
    };
    if (user && await bcrypt.compare(password, user.password)) {
   const token = jwt.sign({
        data: userProfile,
        issuer: 'www.webconsole.az'
    }, process.env.JWT_SECRET, {
        expiresIn: "60s",
    })
    res.json({ token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error during login' });
  }
};
