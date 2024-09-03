const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUpUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(401).json({
        message: "Password and ConfirmPassword do not matched !!",
      });
    }
    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
      return res.status(200).json({
        message: "User with this email already exists !!",
      });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: encryptedPassword });
    res.status(201).json({
      message: "User registered Successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const userlogIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid Email",
      });
    }
    var isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }
    const jwtToken = await jwt.sign(
      { userId: user._id },
      process.env.SECRETKEY,
      { expiresIn: "1h" }
    );

    res.status(202).json({
      message: "User Logged in Successfully.",
      data: {
        token: jwtToken,
        userId: user._id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = { signUpUser, userlogIn };

