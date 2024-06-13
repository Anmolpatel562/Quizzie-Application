const jwt = require("jsonwebtoken"); 

const verifyUser = async (req,res,next) => {
  try {
    const token = req.header("Authorization");
    const jwtToken = token.replace("Bearer","").trim();
    const isVerified = jwt.verify(jwtToken,process.env.SECRETKEY);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Invalid Token",
    });
  }
};

module.exports = { verifyUser };
