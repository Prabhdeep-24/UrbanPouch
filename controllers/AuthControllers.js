const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

function validate(Name, email, password) {
  if (!Name) return "Name is missing";
  if (!email) return "Email is missing";
  if (!password) return "Password is missing";
  return null;
}

module.exports.createUser = async function createUser(Name, email, password, isAdmin) {
  const existingAdmin = await userModel.findOne({ isAdmin: true });

  if (existingAdmin && isAdmin) {
    console.log("⚠️ Owner already exists.");
    return existingAdmin;
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const newUser = await userModel.create({
    Name,
    email,
    password: hash,
    isAdmin
  });

  console.log(`${isAdmin ? "Admin" : "User"} created: ${email}`);
  return newUser;
};

module.exports.registerUser = async function registerUser(req, res) {
  try {
    const { Name, email, password } = req.body;

    const validation = validate(Name, email, password);
    if (validation) {
      req.flash('error_msg', validation);
      return res.redirect('/');
    }

    const user = await userModel.findOne({ email });
    if (user) {
      req.flash('error_msg', 'You already have an account, please log in');
      return res.redirect('/');
    }

    const newUser = await module.exports.createUser(Name, email, password, false);
    const token = generateToken(newUser);

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'lax',
    });

    req.flash('success_msg', 'Registration successful!');
    return res.redirect('/products');
  } catch (err) {
    console.error('Registration error:', err.message);
    req.flash('error_msg', 'Internal Server Error');
    return res.redirect('/');
  }
};

module.exports.loginUser = async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      req.flash('error_msg', 'Email or Password is incorrect');
      return res.redirect('/');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.flash('error_msg', 'Email or Password is incorrect');
      return res.redirect('/login');
    }

    const token = generateToken(user);
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    req.flash('success_msg', 'Login successful!');
    return res.redirect('/products');
  } catch (err) {
    console.error('Login error:', err.message);
    req.flash('error_msg', 'Internal Server Error');
    return res.redirect('/login');
  }
};

module.exports.logoutUser = async function logoutUser(req, res) {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  });

  req.flash('success_msg', 'You have logged out successfully!');
  return res.redirect('/');
};
