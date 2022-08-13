const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../repository/userRepo.js");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const registerUser = asyncHandler(async (req, res) => {
  const { naam, email, paswoord } = req.body;

  if (!naam || !email || !paswoord) {
    res.status(400);
    throw new Error("vul alle velden in aub");
  }

  const bestaatUser = await User.findOne({ email });

  //kijken als user al bestaat
  if (bestaatUser) {
    res.status(400);
    throw new Error("User bestaat al!");
  }

  //wachtwoord hashen en salten
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(paswoord, salt);

  //maken van de user
  const user = await User.create({
    naam,
    email,
    paswoord: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      naam: user.naam,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Data niet goedgekeurd");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, paswoord } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(paswoord, user.paswoord))) {
    res.json({
      _id: user.id,
      naam: user.naam,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("ongeldige inloggegevens");
  }
});

const getUser = asyncHandler(async (req, res) => {
  const { id, naam, email } = await User.findById(req.user.id);

  res.status(200).json({
    id,
    naam,
    email,
  });
});



module.exports = { registerUser, loginUser, getUser };
