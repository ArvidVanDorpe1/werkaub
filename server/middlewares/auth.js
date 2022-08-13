const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../repository/userRepo.js");

const auth = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //token nemen van bearer header
      token = req.headers.authorization.split(" ")[1];

      //controleer token
      const d = jwt.verify(token, process.env.JWT_SECRET);

      //get user van token zonder wachtwoord
      req.user = await User.findById(d.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Niet geauthorizeerd");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Niet geauthorizeerd, geen token!");
  }
});

module.exports = { auth };
