//require userSchema
const userModel = require("../Models/userModel");
//require token
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../utils/errorsUtils");
//require dotenv
require("dotenv").config({ path: "./config/.env" });

//create token
const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

//signUp fnction
module.exports.signUp = async (req, res) => {
  const { userName, userLastName, userEmail, userPassword } = req.body;
  try {
    const user = await userModel.create({
      userName,
      userLastName,
      userEmail,
      userPassword,
    });
    res.status(201).json({ user: user._id });
  } catch (error) {
    const errors = signUpErrors(error);
    res.status(200).send({ errors });
  }
};

module.exports.signIn = async (req, res) => {
  const { userEmail, userPassword } = req.body;

  try {
    const user = await userModel.login(userEmail, userPassword);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(201).json({ user: user._id });
  } catch (error) {
    const errors = signInErrors(error);
    res.status(200).send({ errors });
  }
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
